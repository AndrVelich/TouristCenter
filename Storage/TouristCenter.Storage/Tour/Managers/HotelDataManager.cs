using System.Data.Entity;
using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Tour.Managers;

namespace TouristCenter.Storage.Tour.Managers
{
        public sealed class HotelDataManager : IHotelDataManager
        {
            private readonly TouristCenterContext _dbContext;

            public HotelDataManager(string connectionString)
            {
                _dbContext = new TouristCenterContext(connectionString);
            }

            public Interfaces.Tour.Models.Hotel GetHotel(int hotelId)
            {
                var hotel = _dbContext.Hotels.FirstOrDefault(o => o.HotelId == hotelId);
                return hotel;
            }

            public void CreateHotel(Interfaces.Tour.Models.Hotel hotelDataModel)
            {
                _dbContext.Hotels.Add(hotelDataModel);
                _dbContext.SaveChanges();
            }

            public void UpdateHotel(Interfaces.Tour.Models.Hotel hotelDataModel)
            {
                _dbContext.Entry(hotelDataModel).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
        }
    }
