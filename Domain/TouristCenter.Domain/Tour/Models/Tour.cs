using TouristCenter.Domain.Interfaces.Tour.Models;
using TouristCenter.Domain.Interfaces.Tour.Exceptions;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Storage.Interfaces.Tour.Managers;

namespace TouristCenter.Domain.Tour.Models
{
    internal sealed class Tour : ITour
    {
        private readonly ITourDataManager _tourDataManager;
        private readonly IHotelDataManager _hotelDataManager;
        private readonly IHotelManager _hotelManager;

        private string _name;
        private decimal _price;
        private IHotel _hotel;

        public string Description { get; set; }
        public int TourId { get; private set; }
        public bool IsTransferIncluded { get; set; }
        public bool IsHot { get; set; }

        public string Name
        {
            get { return _name; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new TourNameNotValidException();
                }
                _name = value;
            }
        }

        public decimal Price
        {
            get { return _price; }
            set
            {
                if (!(value > 0))
                {
                    throw new TourPriceNotValidException();
                }
                _price = value;
            }

         }

        public IHotel Hotel
        {
            get { return _hotel; }
            set
            {
                _hotel = value ?? throw new TourHotelNotValidException();
            }
        }
           

        internal Tour(
            Storage.Interfaces.Tour.Models.Tour dataModel,
            ITourDataManager tourDataManager,
            IHotelDataManager hotelDataManager
            )
        {
            _hotelDataManager = hotelDataManager;
            _name = dataModel.Name;
            _price = dataModel.Price;
            _hotel = _hotelManager.GetHotel(dataModel.Hotel.HotelId);
                        
            Description = dataModel.Description;
            IsTransferIncluded = dataModel.IsTransferIncluded;
            IsHot = dataModel.IsHot;
            _tourDataManager = tourDataManager;

        }

        internal Tour(
            ITourDataManager tourDataManager,
            IHotelDataManager hotelDataManager,
            IHotelManager hotelManager,
            string name,
            decimal price,
            IHotel hotel)
        {
            _hotelManager = hotelManager;
            Name = name;
            Price = price;
            hotel = _hotelManager.GetHotel(hotel.HotelId);
            _tourDataManager = tourDataManager;
        }

        public void CreateTour()
        {
            var tourDataModel = ConvertTourToDataModel();
            _tourDataManager.CreateTour(tourDataModel);
        }

        public void UpdateTour()
        {
            var tourDataModel = ConvertTourToDataModel();
            _tourDataManager.UpdateTour(tourDataModel);
        }

        #region [private]

        private Storage.Interfaces.Tour.Models.Tour ConvertTourToDataModel()
        {
            var tourDataModel = new Storage.Interfaces.Tour.Models.Tour
            {
                TourId = TourId,
                Name = Name,
                Description = Description,
                IsTransferIncluded = IsTransferIncluded,
                Price = Price,
                IsHot = IsHot,
                Hotel = _hotelDataManager.GetHotel(Hotel.HotelId)
            };
            return tourDataModel;
        }

        #endregion
    }
}
