using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Common.Converters;
using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Tour.Exceptions;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Domain.Interfaces.Tour.Models;
using TouristCenter.Storage.Interfaces.Tour.Managers;
using TouristCenter.Storage.Interfaces.Image.Managers;
using TourModel = TouristCenter.Domain.Tour.Models.Tour;

namespace TouristCenter.Domain.Tour.Managers
{
    public sealed class TourManager : ITourManager
    {
        private readonly ITourDataManager _tourDataManager;
        private readonly IImageDataManager _imageDataManager;

        public TourManager(ITourDataManager tourDataManager, IImageDataManager imageDataManager)
        {
            _tourDataManager = tourDataManager;
            _imageDataManager = imageDataManager;
        }

        public ITour GetTour(int id)
        {
            var tourDataModel = _tourDataManager.GetTour(id);
            if(tourDataModel == null)
            {
                throw new TourNotFoundException();
            }

            var tour = new TourModel(tourDataModel, _tourDataManager, _imageDataManager);

            return tour;
        }

        public ITour GetTour(TourTypesEnum tourType, string countryUrl, string tourUrl)
        {
            var tourTypeData = TourTypesEnumConverter.ConvertToDbValue(tourType);
            var tourDataModel = _tourDataManager.GetTour(tourTypeData, countryUrl, tourUrl);
            if (tourDataModel == null)
            {
                throw new TourNotFoundException();
            }

            var tour = new TourModel(tourDataModel, _tourDataManager, _imageDataManager);

            return tour;
        }

        public IReadOnlyCollection<ITour> GetTourCollection()
        {
            var tours = _tourDataManager.GetTourCollection()
                .Select(c => new TourModel(c, _tourDataManager, _imageDataManager))
                .ToList();

            return tours;
        }

        public IReadOnlyCollection<ITour> GetTourCollection(TourTypesEnum tourType)
        {
            var tourTypeData = TourTypesEnumConverter.ConvertToDbValue(tourType);
            var tours = _tourDataManager.GetTourCollection(tourTypeData)
                .Select(c => new TourModel(c, _tourDataManager, _imageDataManager))
                .ToList();

            return tours;
        }

        public IReadOnlyCollection<ITour> GetTourCollection(TourTypesEnum tourType, string countryUrl)
        {
            var tourTypeData = TourTypesEnumConverter.ConvertToDbValue(tourType);
            var tours = _tourDataManager.GetTourCollection(tourTypeData, countryUrl)
                .Select(c => new TourModel(c, _tourDataManager, _imageDataManager))
                .ToList();

            return tours;
        }

        public ITour CreateTour(
            string name,
            string urlName,
            string city,
            TourTypesEnum category,
            decimal price,
            int stars,
            string description,
            string country,
            int nights,
            bool isFlightIncluded)
        {
            var tour = new TourModel(
                _tourDataManager,
                _imageDataManager,
                name,
                urlName,
                city,
                category,
                price,
                stars,
                description,
                country,
                nights,
                isFlightIncluded
               );

            return tour;
        }
    }
}
