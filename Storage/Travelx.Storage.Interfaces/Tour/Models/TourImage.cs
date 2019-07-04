using System.ComponentModel.DataAnnotations;
using ImageDataModel = Travelx.Storage.Interfaces.Image.Models.Image;

namespace Travelx.Storage.Interfaces.Tour.Models
{
    public sealed class TourImage
    {
        [Required]
        public int TourId { get; set; }
        public Tour Tour { get; set; }

        [Required]
        public int ImageId { get; set; }
        public ImageDataModel Image { get; set; }
    }
}
