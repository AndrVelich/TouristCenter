using System.Collections.Generic;

namespace Travelx.Storage.Interfaces.Country.Managers
{
    public interface ICountryDataManager
    {
        Models.Country GetCountry(int countryId);
        Models.Country GetCountry(string tourType, string countryUrl);
        IReadOnlyCollection<Models.Country> GetCountryCollection(string tourType);
        IReadOnlyCollection<Models.Country> GetCountryCollection();
        void UpdateCountry(Models.Country countryDataModel);
        Models.Country CreateCountry(Models.Country countryDataModel);
        void DeleteCountry(Models.Country countryDataModel);
        bool CheckCountryUnique(Models.Country countryDataModel);
    }
}
