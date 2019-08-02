using Travelx.Storage.Interfaces.Common.Page;
using Travelx.Storage.Interfaces.Country.Filter;

namespace Travelx.Storage.Interfaces.Country.Managers
{
    public interface ICountryDataManager
    {
        Models.Country GetCountry(int countryId);
        Models.Country GetCountry(string tourType, string countryUrl);
        PageDataModel<Models.Country> GetCountriesPage(CountryDataFilter filter);
        void UpdateCountry(Models.Country countryDataModel);
        Models.Country CreateCountry(Models.Country countryDataModel);
        void DeleteCountry(Models.Country countryDataModel);
        bool CheckCountryUnique(Models.Country countryDataModel);
    }
}
