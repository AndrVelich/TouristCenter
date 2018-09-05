using TouristCenter.Domain.Interfaces.Tour.Exceptions;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Domain.Interfaces.Tour.Models;
using TouristCenter.Storage.Interfaces.Tour.Managers;

namespace TouristCenter.Domain.Tour.Managers
{
    public sealed class HotelManager : IHotelManager
    {
        private readonly IHotelDataManager _hotelDataManager;
        private readonly IHotelManager _hotelManager;
        private readonly IApartmentDataManager _apartmentDataManager;
        private readonly IApartmentManager _apartmentManager;

        public HotelManager(
            IHotelDataManager hotelDataManager,
            IHotelManager hotelDManager,
            IApartmentDataManager apartmentDataManager,
            IApartmentManager apartmentManager
            )
        {
            _hotelDataManager = hotelDataManager;
            _hotelManager = hotelDManager;
            _apartmentDataManager = apartmentDataManager;
            _apartmentManager = apartmentManager;
        }

        public IHotel GetHotel(int hotelId)
        {
            var hotelDataModel = _hotelDataManager.GetHotel(hotelId);
            if (hotelDataModel == null)
            {
                throw new HotelNotFoundException();
            }
            var hotel = new Models.Hotel(hotelDataModel, _hotelDataManager, _apartmentDataManager, _apartmentManager);
            return hotel;
        }

        public IHotel CreateHotel(
            string name,
            int stars,
            string country)
        {
            var hotel = new Models.Hotel(
            _hotelDataManager,
            _apartmentDataManager,
            name,
            stars,
            country
            );
            return hotel;
        }
    }
}
