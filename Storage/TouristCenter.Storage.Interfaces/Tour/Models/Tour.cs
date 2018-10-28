using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CountryDataModel = TouristCenter.Storage.Interfaces.Country.Models.Country;

namespace TouristCenter.Storage.Interfaces.Tour.Models
{
    public class Tour
    {
        public Tour()
        {
            Images = new HashSet<Image.Models.Image>();
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
        public CountryDataModel Country { get; set; }

        public virtual ICollection<Image.Models.Image> Images { get; set; }
    }
}
