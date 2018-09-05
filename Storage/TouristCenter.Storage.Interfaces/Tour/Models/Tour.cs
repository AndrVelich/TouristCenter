using System.ComponentModel.DataAnnotations;

namespace TouristCenter.Storage.Interfaces.Tour.Models
{
    public sealed class Tour
    {
        [Required]
        public int TourId { get; set; }
        [Required]
        public string Name { get; set; }
        [MaxLength(1000)]
        public string Description { get; set; }
        public bool IsTransferIncluded { get; set; }
        [Required]
        public decimal Price { get; set; }
        public bool IsHot { get; set; }
        [Required]
        public Hotel Hotel { get; set; }
     }
}
