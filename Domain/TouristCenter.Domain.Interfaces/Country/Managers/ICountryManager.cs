using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Country.Models;

namespace TouristCenter.Domain.Interfaces.Country.Managers
{
    public interface ICountryManager
    {
        ICountry GetCountry(int id);
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
