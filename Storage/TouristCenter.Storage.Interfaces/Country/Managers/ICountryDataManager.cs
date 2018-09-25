namespace TouristCenter.Storage.Interfaces.Country.Managers
{
    public interface ICountryDataManager
    {
        Models.Country GetCountry(int countryId);
        void UpdateCountry(Models.Country countryDataModel);
        void CreateCountry(Models.Country countryDataModel);
    }
}
