using System.Data.Entity;
using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Country.Managers;
using CountryDataModel = TouristCenter.Storage.Interfaces.Country.Models.Country;

namespace TouristCenter.Storage.Country.Managers
{
    public sealed class CountryDataManager : ICountryDataManager
    {
        private readonly TouristCenterContext _dbContext;

        public CountryDataManager(string connectionString)
        {
            _dbContext = new TouristCenterContext(connectionString);
        }

        public CountryDataModel GetCountry(int countryId)
        {
            var country = _dbContext.Countries.FirstOrDefault(o => o.CountryId == countryId);
            return country;
        }

        public void CreateCountry(CountryDataModel countryDataModel)
        {
            _dbContext.Countries.Add(countryDataModel);
            _dbContext.SaveChanges();
        }

        public void UpdateCountry(CountryDataModel countryDataModel)
        {
            _dbContext.Entry(countryDataModel).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }
    }
}
