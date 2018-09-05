using TouristCenter.Domain.Interfaces.Tour.Exceptions;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Domain.Interfaces.Tour.Models;
using TouristCenter.Storage.Interfaces.Tour.Managers;

namespace TouristCenter.Domain.Tour.Managers
{
    public sealed class TourManager : ITourManager
    {
        private readonly ITourDataManager _tourDataManager;
        private readonly IHotelDataManager _hotelDataManager;
        private readonly IHotelManager _hotelManager;

        public TourManager(
            ITourDataManager tourDataManager,
            IHotelDataManager hotelDataManager,
            IHotelManager hotelDManager
            )
        {
            _tourDataManager = tourDataManager;
            _hotelDataManager = hotelDataManager;
            _hotelManager = hotelDManager;
        }

        public ITour GetTour(int tourId)
        {
            var tourDataModel = _tourDataManager.GetTour(tourId);
            if (tourDataModel == null)
            {
                throw new TourNotFoundException();
            }
            var tour = new Models.Tour(tourDataModel, _tourDataManager, _hotelDataManager);
            return tour;
        }

        public ITour CreateTour(
            string name,
            decimal price,
            IHotel hotel)
        {

            var tour = new Models.Tour(
            _tourDataManager,
            _hotelDataManager,
            _hotelManager,
            name,
            price,
            hotel
            );
            return tour;
        }
    }
}
