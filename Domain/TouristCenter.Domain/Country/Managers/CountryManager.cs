using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Country.Exceptions;
using TouristCenter.Domain.Interfaces.Country.Managers;
using TouristCenter.Domain.Interfaces.Country.Models;
using TouristCenter.Storage.Interfaces.Country.Managers;
using CountryModel = TouristCenter.Domain.Country.Models.Country;

namespace TouristCenter.Domain.Country.Managers
{
    public sealed class CountryManager : ICountryManager
    {
        private readonly ICountryDataManager _countryDataManager;

        public CountryManager(ICountryDataManager countryDataManager)
        {
            _countryDataManager = countryDataManager;
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
    }
}
