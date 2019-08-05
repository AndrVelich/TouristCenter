using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Common.Page;
using Travelx.Domain.Interfaces.Image.Managers;
using Travelx.Domain.Interfaces.Image.Models;
using Travelx.Domain.Interfaces.Tour.Exceptions;
using Travelx.Domain.Interfaces.Tour.Filter;
using Travelx.Domain.Interfaces.Tour.Managers;
using Travelx.Domain.Interfaces.Tour.Models;
using Travelx.Helpers.Converters;
using Travelx.Models.Common.Page;
using Travelx.Models.Tour;
using Travelx.Settings;

namespace Travelx.Controllers
{
    public class TourController : Controller
    {
        private readonly ITourManager _tourManager;
        private readonly TravelxSettings _settings;
        private readonly IImageManager _imageManager;

        public TourController(ITourManager tourManager, 
            IOptions<TravelxSettings> config, 
            IImageManager imageManager)
        {
            _tourManager = tourManager;
            _imageManager = imageManager;
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
        [Route("api/tours")]
        public PageViewModel<TourViewModel> GetCollection(string tourType, string country, int skip = 0, int take = int.MaxValue)
        {
            var tourFilter = new TourFilter(skip, take)
            {
                TourType = string.IsNullOrWhiteSpace(tourType) ? (TourTypesEnum?)null : TourTypesConverter.ConvertFromString(tourType),
                CountryUrl = country
            };
            var toursPage = _tourManager.GetToursPage(tourFilter);
            var result = GetToursPageViewModel(toursPage);

            return result;
        }

        [HttpGet]
        [Route("api/hotTours")]
        public PageViewModel<TourViewModel> GetHotCollection(string country, int skip = 0, int take = int.MaxValue)
        {
            var tourFilter = new TourFilter(skip, take)
            {
                TourType = TourTypesEnum.Beach,
                CountryUrl = country
            };
            var toursPage = _tourManager.GetToursPage(tourFilter);
            var discount = _settings.HotToursDiscount;

            var result = GetToursPageViewModel(toursPage);
            SetDiscount(result.Collection, discount);

            return result;
        }

        [HttpGet]
        [Route("api/earlyTours")]
        public PageViewModel<TourViewModel> GetEarlyCollection(string country, int skip = 0, int take = int.MaxValue)
        {
            var tourFilter = new TourFilter(skip, take)
            {
                TourType = TourTypesEnum.Beach,
                CountryUrl = country
            };
            var toursPage = _tourManager.GetToursPage(tourFilter);
            var discount = _settings.EarlyToursDiscount;
            var result = GetToursPageViewModel(toursPage);

            SetDiscount(result.Collection, discount);

            return result;
        }

        [Authorize]
        public void Post([FromBody]TourViewModel tour)
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

            var imageForDeleteCollection = tourModel.ImageIdCollection.Where(imageId => !tour.OldImageCollection.Contains(imageId)).ToList();

            foreach (var newImage in tour.NewImageCollection)
            {
                var image = CreateImage(newImage);
                tourModel.AddImage(image.ImageId);
            }

            foreach (var imageId in imageForDeleteCollection)
            {
                tourModel.DeleteImage(imageId);
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

        private IImage CreateImage(string rawImage)
        {
            var mimeType = ImageConverter.GetImageMimeType(rawImage);
            var imageData = ImageConverter.GetImageData(rawImage);
            var image = _imageManager.CreateImage(mimeType, imageData);

            return image;
        }

        private PageViewModel<TourViewModel> GetToursPageViewModel(PageModel<ITour> pageModel)
        {
            var toursPageCollection = pageModel.Collection.Select(c => new TourViewModel(c))
                .ToList();
            var result = new PageViewModel<TourViewModel>(pageModel.Count, toursPageCollection);

            return result;
        }

        private void SetDiscount(IReadOnlyCollection<TourViewModel> tourCollection, decimal discount)
        {
            foreach (var tour in tourCollection)
            {
                tour.Price = (int)(tour.Price * discount);
            }
        }

    }
}

