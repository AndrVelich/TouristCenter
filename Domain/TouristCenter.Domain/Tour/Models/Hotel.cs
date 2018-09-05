using TouristCenter.Domain.Interfaces.Tour.Models;
using TouristCenter.Domain.Interfaces.Tour.Exceptions;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Storage.Interfaces.Tour.Managers;
using System.Collections.Generic;

namespace TouristCenter.Domain.Tour.Models
{
    internal sealed class Hotel : IHotel
    {
        private readonly IHotelDataManager _hotelDataManager;
        private readonly IApartmentDataManager _apartmentDataManager;
        private readonly IApartmentManager _apartmentManager;

        private string _name;
        private int _stars;
        private string _country;

        public int HotelId { get; private set; }
        public string Description { get; set; }
        public string City { get; set; }
        public int DistanceToSea { get; set; }
        public string Services { get; set; }
        public string ChildServices { get; set; }
        public string Food { get; set; }
        public bool HasPool { get; set; }
        public bool HasOwnBeach { get; set; }
        public bool HasInternet { get; set; }
        public List<string> ImageIdCollection { get; set; }
        public IApartment Apartment { get; set; }

        public string Name
        {
            get { return _name; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new HotelNameNotValidException();
                }
                _name = value;
            }
        }

        public int Stars
        {
            get { return _stars; }
            set
            {
                if (!(value > 0 && value <6))
                {
                    throw new HotelStarsNotValidException();
                }
                _stars = value;
            }
        }

        public string Country
        {
            get { return _country; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new HotelCountryNotValidException();
                }
                _country = value;
            }
        }

        internal Hotel(
            Storage.Interfaces.Tour.Models.Hotel dataModel,
            IHotelDataManager hotelDataManager,
            IApartmentDataManager apartmentDataManager,
            IApartmentManager apartmentManager
            )
        {
            _hotelDataManager = hotelDataManager;
            _apartmentDataManager = apartmentDataManager;
            _name = dataModel.Name;

            _stars = dataModel.Stars;
            _country = dataModel.Country;

            Description = dataModel.Description;
            City = dataModel.City;
            DistanceToSea = dataModel.DistanceToSea;
            Services = dataModel.Services;
            ChildServices = dataModel.ChildServices;
            Food = dataModel.Food;
            HasPool = dataModel.HasPool;
            HasOwnBeach = dataModel.HasOwnBeach;
            HasInternet = dataModel.HasInternet;
            ImageIdCollection = dataModel.ImageIdCollection;
            Apartment = _apartmentManager.GetApartment(dataModel.Apartment.ApartmentId);
        }

        internal Hotel(
            IHotelDataManager hotelDataManager,
            IApartmentDataManager apartmentDataManager,
            string name,
            int stars,
            string country)
        {

            _hotelDataManager = hotelDataManager;
            Name = name;
            Stars = stars;
            Country =  country;
        }

        public void CreateHotel()
        {
            var hotelDataModel = ConvertHotelToDataModel();
            _hotelDataManager.CreateHotel(hotelDataModel);
        }

        public void UpdateHotel()
        {
            var hotelDataModel = ConvertHotelToDataModel();
            _hotelDataManager.UpdateHotel(hotelDataModel);
        }

        #region [private]

        private Storage.Interfaces.Tour.Models.Hotel ConvertHotelToDataModel()
        {
            var hotelDataModel = new Storage.Interfaces.Tour.Models.Hotel
            {
                Name = Name,
                Stars = Stars,
                Country = Country,
                Description = Description,
                City = City,
                DistanceToSea = DistanceToSea,
                Services = Services,
                ChildServices = ChildServices,
                Food = Food,
                HasPool = HasPool,
                HasOwnBeach = HasOwnBeach,
                HasInternet = HasInternet,
                ImageIdCollection = ImageIdCollection,
                Apartment = _apartmentDataManager.GetApartment(Apartment.ApartmentId)
            };
            return hotelDataModel;
        }

        #endregion
    }
}
