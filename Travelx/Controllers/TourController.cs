using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Tour.Exceptions;
using Travelx.Domain.Interfaces.Tour.Managers;
using Travelx.Domain.Interfaces.Tour.Models;
using Travelx.Helpers.Converters;
using Travelx.Models.Tour;
using Travelx.Settings;

namespace Travelx.Controllers
{
    public class TourController : Controller
    {
        private readonly ITourManager _tourManager;
        private readonly TravelxSettings _settings;

        public TourController(ITourManager tourManager, IOptions<TravelxSettings> config)
        {
            _tourManager = tourManager;
            _settings = config?.Value;
        }

        [HttpGet]
        [Route("api/tour/{tourType}/{countryUrl}/{tourUrl}")]
        public TourViewModel GetTour(string tourType, string countryUrl, string tourUrl)
        {
            var tourTypeDomain = TourTypesConverter.ConvertFromString(tourType);
            var tour = _tourManager.GetTour(tourTypeDomain, countryUrl, tourUrl);
            var tourViewModel = new TourViewModel(tour);

            return tourViewModel;
        }

        [HttpGet]
        [Route("api/tours/allTours")]
        public List<TourViewModel> GetCollection()
        {
            var tours = _tourManager.GetTourCollection();

            var result = tours.Select(c => new TourViewModel(c))
                .OrderBy(t => t.Category)
                .ThenBy(t => t.Country)
                .ThenBy(t => t.Name)
                .ToList();

            return result;
        }

        [HttpGet]
        [Route("api/tours/{tourType}")]
        public List<TourViewModel> GetCollection(string tourType)
        {
            var domainTourType = TourTypesConverter.ConvertFromString(tourType);
            var tours = _tourManager.GetTourCollection(domainTourType);
            var result = tours.Select(c => new TourViewModel(c))
                .OrderBy(t => t.Country)
                .ThenBy(t => t.Name)
                .ToList();

            return result;
        }

        [HttpGet]
        [Route("api/hotTours/{countryUrl}")]
        public List<TourViewModel> GetHotCollection(string countryUrl)
        {
            var domainTourType = TourTypesEnum.Beach;
            var tours = _tourManager.GetTourCollection(domainTourType, countryUrl);

            var discount = _settings.HotToursDiscount;
            foreach (var tour in tours)
            {
                tour.Price = (int)(tour.Price * discount);
            }

            var result = tours.Select(c => new TourViewModel(c))
                .ToList();

            return result;
        }

        [HttpGet]
        [Route("api/earlyTours/{countryUrl}")]
        public List<TourViewModel> GetEarlyCollection(string countryUrl)
        {
            var domainTourType = TourTypesEnum.Beach;
            var tours = _tourManager.GetTourCollection(domainTourType, countryUrl);

            var discount = _settings.EarlyToursDiscount;
            foreach (var tour in tours)
            {
                tour.Price = (int)(tour.Price * discount);
            }

            var result = tours.Select(c => new TourViewModel(c))
                .ToList();

            return result;
        }

        [HttpGet]
        [Route("api/tours/{tourType}/{countryUrl}")]
        public List<TourViewModel> GetCollection(string tourType, string countryUrl)
        {
            var domainTourType = TourTypesConverter.ConvertFromString(tourType);
            var tours = _tourManager.GetTourCollection(domainTourType, countryUrl);
            var result = tours.Select(c => new TourViewModel(c))
                .OrderBy(t => t.Name)
                .ToList();

            return result;
        }

        [Authorize]
        public void Post(TourViewModel tour)
        {
            ITour tourModel;
            try
            {
                tourModel = _tourManager.GetTour(tour.TourId);
                tourModel.Name = tour.Name;
                tourModel.UrlName = tour.UrlName;
                tourModel.City = tour.City;
                tourModel.Category = TourTypesConverter.ConvertFromString(tour.Category);
                tourModel.Price = tour.Price;
                tourModel.Stars = tour.Stars;
                tourModel.Description = tour.Description;
                tourModel.Country = tour.Country;
                tourModel.Nights = tour.Nights;
                tourModel.IsFlightIncluded = tour.IsFlightIncluded;
            }
            catch (TourNotFoundException)
            {
                tourModel = _tourManager.CreateTour(
                        tour.Name,
                        tour.UrlName,
                        tour.City,
                        TourTypesConverter.ConvertFromString(tour.Category),
                        tour.Price,
                        tour.Stars,
                        tour.Description,
                        tour.Country,
                        tour.Nights,
                        tour.IsFlightIncluded
                    );
            }

            var imageForDeleteCollection = tourModel.ImageCollection.Where(im => !tour.OldImageCollection.Contains(im.ImageId)).ToList();

            foreach (var newImage in tour.NewImageCollection)
            {
                var mimeType = ImageConverter.GetImageMimeType(newImage);
                var imageData = ImageConverter.GetImageData(newImage);

                tourModel.AddImage(imageData, mimeType);
            }

            foreach (var newImage in imageForDeleteCollection)
            {
                tourModel.DeleteImage(newImage);
            }

            tourModel.Save();
        }

        [Authorize]
        [HttpDelete]
        [Route("api/tour/{id}")]
        public void Delete(int id)
        {
            var tour = _tourManager.GetTour(id);
            tour.Delete();
        }
    }
}

