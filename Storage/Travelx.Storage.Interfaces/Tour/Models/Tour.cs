using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CountryDataModel = Travelx.Storage.Interfaces.Country.Models.Country;

namespace Travelx.Storage.Interfaces.Tour.Models
{
    public sealed class Tour
    {
        public Tour()
        {
            TourImages = new HashSet<TourImage>();
        }

        [Required]
        public int TourId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string UrlName { get; set; }

        [Required]
        [MaxLength(200)]
        public string City { get; set; }

        [Required]
        [MaxLength(200)]
        public string Category { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Stars { get; set; }

        [Required]
        public int Nights { get; set; }

        [Required]
        public bool IsFlightIncluded { get; set; }

        public string Description { get; set; }

        [Required]
        public int CountryId { get; set; }

        [Required]
        public CountryDataModel Country { get; set; }

        public ICollection<TourImage> TourImages { get; set; }
    }
}
