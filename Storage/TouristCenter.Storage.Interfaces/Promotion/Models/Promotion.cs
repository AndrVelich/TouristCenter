using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristCenter.Storage.Interfaces.Promotion.Models
{
    public class Promotion
    {
        public Promotion()
        {
            Images = new HashSet<Image.Models.Image>();
        }

        [Required]
        public int PromotionId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string UrlName { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime UntilDate { get; set; }

        public string Title { get; set; }

        public string MetaDescription { get; set; }

        public string MetaKeywords { get; set; }

        public virtual ICollection<Image.Models.Image> Images { get; set; }
    }
}
