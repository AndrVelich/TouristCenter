using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristCenter.Storage.Interfaces.Country.Models
{
    public class Country
    {
        public Country()
        {
            Images = new HashSet<Image.Models.Image>();
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

        public virtual ICollection<Image.Models.Image> Images { get; set; }
    }
}
