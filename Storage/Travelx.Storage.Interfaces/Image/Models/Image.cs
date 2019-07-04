using System;
using System.Collections.Generic;
using Travelx.Storage.Interfaces.Country.Models;
using Travelx.Storage.Interfaces.Promotion.Models;
using Travelx.Storage.Interfaces.Tour.Models;

namespace Travelx.Storage.Interfaces.Image.Models
{
    public sealed class Image
    {
        public Image()
        {
            CountryImages = new HashSet<CountryImage>();
            TourImages = new HashSet<TourImage>();
            PromotionImages = new HashSet<PromotionImage>();
        }

        public int ImageId { get; set; }
        public Byte[] ImageData { get; set; }
        public string MimeType { get; set; }

        public ICollection<CountryImage> CountryImages { get; set; }
        public ICollection<TourImage> TourImages { get; set; }
        public ICollection<PromotionImage> PromotionImages { get; set; }
    }
}
