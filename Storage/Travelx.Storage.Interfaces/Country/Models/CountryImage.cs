using System.ComponentModel.DataAnnotations;
using ImageDataModel = Travelx.Storage.Interfaces.Image.Models.Image;

namespace Travelx.Storage.Interfaces.Country.Models
{
    public sealed class CountryImage
    {
        [Required]
        public int CountryId { get; set; }
        public Country Country { get; set; }

        [Required]
        public int ImageId { get; set; }
        public ImageDataModel Image { get; set; }
    }
}
