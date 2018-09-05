using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;


namespace TouristCenter.Storage.Interfaces.Tour.Models
{
    public sealed class Hotel
    {
        [Required]
        public int HotelId { get; set; }
        [Required]
        public string Name { get; set; }
        [MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        public int Stars { get; set; }
        [Required]
        [MaxLength(200)]
        public string Country { get; set; }
        [MaxLength(200)]
        public string City { get; set; }
        public int DistanceToSea { get; set; }
        [MaxLength(500)]
        public string Services { get; set; }
        [MaxLength(200)]
        public string ChildServices { get; set; }
        [MaxLength(200)]
        public string Food { get; set; }
        public bool HasPool { get; set; }
        public bool HasOwnBeach { get; set; }
        public bool HasInternet { get; set; }
        public List<string> ImageIdCollection { get; set; }
        public Apartment Apartment { get; set; }

    }
}
