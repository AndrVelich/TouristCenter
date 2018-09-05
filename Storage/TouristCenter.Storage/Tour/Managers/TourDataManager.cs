using System.Data.Entity;
using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Tour.Managers;

namespace TouristCenter.Storage.Tour.Managers
{
    public sealed class TourDataManager : ITourDataManager
    {
        private readonly TouristCenterContext _dbContext;

        public TourDataManager(string connectionString)
        {
            _dbContext = new TouristCenterContext(connectionString);
        }

        public Interfaces.Tour.Models.Tour GetTour(int tourId)
        {
            var tour = _dbContext.Tours.FirstOrDefault(o => o.TourId == tourId);
            return tour;
        }

        public void CreateTour(Interfaces.Tour.Models.Tour tourDataModel)
        {
            _dbContext.Tours.Add(tourDataModel);
            _dbContext.SaveChanges();
        }

        public void UpdateTour(Interfaces.Tour.Models.Tour tourDataModel)
        {
            _dbContext.Entry(tourDataModel).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }
    }
}
