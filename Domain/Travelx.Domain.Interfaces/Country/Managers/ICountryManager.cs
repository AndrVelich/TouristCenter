using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Common.Page;
using Travelx.Domain.Interfaces.Country.Filter;
using Travelx.Domain.Interfaces.Country.Models;

namespace Travelx.Domain.Interfaces.Country.Managers
{
    public interface ICountryManager
    {
        ICountry GetCountry(int id);
        ICountry GetCountry(TourTypesEnum tourType, string countryUrl);
        PageModel<ICountry> GetCountriesPage(CountryFilter filter);
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
