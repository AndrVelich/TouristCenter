using System.Collections.Generic;

namespace TouristCenter.Domain.Interfaces.Tour.Models
{
    public interface IHotel
    {
        int HotelId { get; }
        string Name { get; set; }
        string Description { get; set; }
        int Stars { get; set; }
        string Country { get; set; }
        string City { get; set; }
        int DistanceToSea { get; set; }
        string Services { get; set; }
        string ChildServices { get; set; }
        string Food { get; set; }
        bool HasPool { get; set; }
        bool HasOwnBeach { get; set; }
        bool HasInternet { get; set; }
        List<string> ImageIdCollection { get; set; }
        IApartment Apartment { get; set; }

        void CreateHotel();
        void UpdateHotel();
    }
}
