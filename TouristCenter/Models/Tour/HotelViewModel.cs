using System.Collections.Generic;

namespace TouristCenter.Models.Tour
{
    public sealed class HotelViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Stars { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int DistanceToSea { get; set; }
        public string Services { get; set; }
        public string ChildServices { get; set; }
        public string Food { get; set; }
        public bool HasPool { get; set; }
        public bool HasOwnBeach { get; set; }
        public bool HasInternet { get; set; }

        public List<string> ImageIdCollection { get; set; }

        public ApartmentViewModel Apartment { get; set; }
    }
}