using System.ComponentModel.DataAnnotations;
using ImageDataModel = Travelx.Storage.Interfaces.Image.Models.Image;

namespace Travelx.Storage.Interfaces.Promotion.Models
{
    public sealed class PromotionImage
    {
        [Required]
        public int PromotionId { get; set; }
        public Promotion Promotion { get; set; }

        [Required]
        public int ImageId { get; set; }
        public ImageDataModel Image { get; set; }
    }
}
