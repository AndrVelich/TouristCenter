using System.Data.Entity;
using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Tour.Managers;

namespace TouristCenter.Storage.Tour.Managers
{

    public sealed class ApartmentDataManager : IApartmentDataManager
    {
        private readonly TouristCenterContext _dbContext;

        public ApartmentDataManager(string connectionString)
        {
            _dbContext = new TouristCenterContext(connectionString);
        }

        public Interfaces.Tour.Models.Apartment GetApartment(int apartmentId)
        {
            var apartment = _dbContext.Apartments.FirstOrDefault(o => o.ApartmentId == apartmentId);
            return apartment;
        }

        public void CreateApartment(Interfaces.Tour.Models.Apartment apartmentDataModel)
        {
            _dbContext.Apartments.Add(apartmentDataModel);
            _dbContext.SaveChanges();
        }

        public void UpdateApartment(Interfaces.Tour.Models.Apartment apartmentDataModel)
        {
            _dbContext.Entry(apartmentDataModel).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }
    }
}
