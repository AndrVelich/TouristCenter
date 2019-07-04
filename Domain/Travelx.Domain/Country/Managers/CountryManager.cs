using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Common.Converters;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Country.Exceptions;
using Travelx.Domain.Interfaces.Country.Managers;
using Travelx.Domain.Interfaces.Country.Models;
using Travelx.Storage.Interfaces.Country.Managers;
using CountryModel = Travelx.Domain.Country.Models.Country;

namespace Travelx.Domain.Country.Managers
{
    public sealed class CountryManager : ICountryManager
    {
        private readonly ICountryDataManager _countryDataManager;

        public CountryManager(ICountryDataManager countryDataManager)
        {
            _countryDataManager = countryDataManager;
        }

        public ICountry GetCountry(int id)
        {
            var countryDataModel = _countryDataManager.GetCountry(id);
            if(countryDataModel == null)
            {
                throw new CountryNotFoundException();
            }

            var country = new CountryModel(countryDataModel, _countryDataManager);

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

            var country = new CountryModel(countryDataModel, _countryDataManager);

            return country;
        }

        public IReadOnlyCollection<ICountry> GetCountryCollection()
        {
            var countries = _countryDataManager.GetCountryCollection()
                .Select(c => new CountryModel(c, _countryDataManager))
                .ToList();

            return countries;
        }

        public IReadOnlyCollection<ICountry> GetCountryCollection(TourTypesEnum tourType)
        {
            var tourTypeData = TourTypesEnumConverter.ConvertToDbValue(tourType);
            var countries = _countryDataManager.GetCountryCollection(tourTypeData)
                .Select(c => new CountryModel(c, _countryDataManager))
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
