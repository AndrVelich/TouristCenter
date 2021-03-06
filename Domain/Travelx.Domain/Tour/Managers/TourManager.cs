﻿using System.Linq;
using Travelx.Domain.Common.Converters;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Common.Page;
using Travelx.Domain.Interfaces.Tour.Exceptions;
using Travelx.Domain.Interfaces.Tour.Filter;
using Travelx.Domain.Interfaces.Tour.Managers;
using Travelx.Domain.Interfaces.Tour.Models;
using Travelx.Domain.Tour.Convertors;
using Travelx.Storage.Interfaces.Image.Managers;
using Travelx.Storage.Interfaces.Tour.Managers;
using TourModel = Travelx.Domain.Tour.Models.Tour;

namespace Travelx.Domain.Tour.Managers
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

        public PageModel<ITour> GetToursPage(TourFilter filter)
        {
            var dataFilter = TourFilterConverter.ConvertToDbValue(filter);
            var tourPageData = _tourDataManager.GetToursPage(dataFilter);
            var tourPageCollection = tourPageData.Collection.Select(c => new TourModel(c, _tourDataManager, _imageDataManager))
                .ToList();
            var result = new PageModel<ITour>(tourPageData.Count, tourPageCollection);

            return result;
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
