using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Travelx.Storage.Interfaces.Country.Models
{
    public sealed class Country
    {
        public Country()
        {
            CountryImages = new HashSet<CountryImage>();
            Tours = new HashSet<Tour.Models.Tour>();
        }

        [Required]
        public int CountryId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string UrlName { get; set; }

        [Required]
        [MaxLength(200)]
        public string Category { get; set; }

        [Required]
        public decimal ThreeStarsPrice { get; set; }

        [Required]
        public decimal FourStarsPrice { get; set; }

        [Required]
        public decimal FiveStarsPrice { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string PageContent { get; set; }

        public string PageContentBottom { get; set; }

        public string Title { get; set; }

        public string MetaDescription { get; set; }
        
        public string MetaKeywords { get; set; }

        public string PageHeader { get; set; }

        public ICollection<CountryImage> CountryImages { get; set; }
        public ICollection<Tour.Models.Tour> Tours { get; set; }
    }
}
