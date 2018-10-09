using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TouristCenter.Domain.Interfaces.Country.Managers;
using TouristCenter.Domain.Interfaces.Image.Managers;
using TouristCenter.Domain.Interfaces.Tour.Exceptions;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Domain.Interfaces.Tour.Models;
using TouristCenter.Helpers.Converters;
using TouristCenter.Models.Tour;

namespace TouristCenter.Controllers
{
    public class TourController : ApiController
    {
        private readonly ITourManager _tourManager;
        private readonly ICountryManager _countryManager;
        private readonly IImageManager _imageManager;

        public TourController(ITourManager tourManager,
            ICountryManager countryManager,
            IImageManager imageManager)
        {
            _tourManager = tourManager;
            _countryManager = countryManager;
            _imageManager = imageManager;
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

            var result = tours.Select(c => new TourViewModel(c)).ToList();

            return result;
        }

        [HttpGet]
        [Route("api/tours/{tourType}")]
        public List<TourViewModel> GetCollection(string tourType)
        {
            var domainTourType = TourTypesConverter.ConvertFromString(tourType);
            var tours = _tourManager.GetTourCollection(domainTourType);
            var result = tours.Select(c => new TourViewModel(c)).ToList();

            return result;
        }

        [HttpGet]
        [Route("api/tours/{tourType}/{countryUrl}")]
        public List<TourViewModel> GetCollection(string tourType, string countryUrl)
        {
            var domainTourType = TourTypesConverter.ConvertFromString(tourType);
            var tours = _tourManager.GetTourCollection(domainTourType, countryUrl);
            var result = tours.Select(c => new TourViewModel(c)).ToList();

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
    }
}

