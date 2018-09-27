using System;
using System.Collections.Generic;

namespace TouristCenter.Storage.Interfaces.Image.Models
{
    public class Image
    {
        public Image()
        {
            Countries = new HashSet<Country.Models.Country>();
        }

        public int ImageId { get; set; }
        public Byte[] ImageData { get; set; }
        public string MimeType { get; set; }

        public virtual ICollection<Country.Models.Country> Countries { get; set; }
    }
}
