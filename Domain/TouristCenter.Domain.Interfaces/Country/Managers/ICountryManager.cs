using System.Collections.Generic;
using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Country.Models;

namespace TouristCenter.Domain.Interfaces.Country.Managers
{
    public interface ICountryManager
    {
        ICountry GetCountry(int id);
        ICountry GetCountry(TourTypesEnum tourType, string countryUrl);
        IReadOnlyCollection<ICountry> GetCountryCollection();
        IReadOnlyCollection<ICountry> GetCountryCollection(TourTypesEnum tourType);
        ICountry CreateCountry(string name,
            string urlName,
            TourTypesEnum category,
            decimal threeStarsPrice,
            decimal fourStarsPrice,
            decimal fiveStarsPrice,
            string description,
            string pageContent);
    }
}
