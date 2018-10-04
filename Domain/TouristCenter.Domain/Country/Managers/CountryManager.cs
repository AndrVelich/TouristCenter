using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Common.Converters;
using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Country.Exceptions;
using TouristCenter.Domain.Interfaces.Country.Managers;
using TouristCenter.Domain.Interfaces.Country.Models;
using TouristCenter.Storage.Interfaces.Country.Managers;
using TouristCenter.Storage.Interfaces.Image.Managers;
using CountryModel = TouristCenter.Domain.Country.Models.Country;

namespace TouristCenter.Domain.Country.Managers
{
    public sealed class CountryManager : ICountryManager
    {
        private readonly ICountryDataManager _countryDataManager;
        private readonly IImageDataManager _imageDataManager;

        public CountryManager(ICountryDataManager countryDataManager, IImageDataManager imageDataManager)
        {
            _countryDataManager = countryDataManager;
            _imageDataManager = imageDataManager;
        }

        public ICountry GetCountry(int id)
        {
            var countryDataModel = _countryDataManager.GetCountry(id);
            if(countryDataModel == null)
            {
                throw new CountryNotFoundException();
            }

            var country = new CountryModel(countryDataModel, _countryDataManager, _imageDataManager);

            return country;
        }

        public ICountry GetCountry(TourTypesEnum tourType, string countryUrl)
        {
            var tourTypeData = TourTypesEnumConverter.ConvertToDbValue(tourType);
            var countryDataModel = _countryDataManager.GetCountry(tourTypeData, countryUrl);
            if (countryDataModel == null)
            {
                throw new CountryNotFoundException();
            }

            var country = new CountryModel(countryDataModel, _countryDataManager, _imageDataManager);

            return country;
        }

        public IReadOnlyCollection<ICountry> GetCountryCollection()
        {
            var countries = _countryDataManager.GetCountryCollection()
                .Select(c => new CountryModel(c, _countryDataManager, _imageDataManager))
                .ToList();

            return countries;
        }

        public IReadOnlyCollection<ICountry> GetCountryCollection(TourTypesEnum tourType)
        {
            var tourTypeData = TourTypesEnumConverter.ConvertToDbValue(tourType);
            var countries = _countryDataManager.GetCountryCollection(tourTypeData)
                .Select(c => new CountryModel(c, _countryDataManager, _imageDataManager))
                .ToList();

            return countries;
        }

        public ICountry CreateCountry(
            string name,
            string urlName,
            TourTypesEnum category,
            decimal threeStarsPrice,
            decimal fourStarsPrice,
            decimal fiveStarsPrice,
            string description,
            string pageContent)
        {
            var country = new CountryModel(
                _countryDataManager,
                _imageDataManager,
                name,
                urlName,
                category,
                threeStarsPrice,
                fourStarsPrice,
                fiveStarsPrice,
                description,
                pageContent
               );

            return country;
        }
    }
}
