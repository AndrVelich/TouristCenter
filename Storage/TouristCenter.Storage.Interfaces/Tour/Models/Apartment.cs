using System.ComponentModel.DataAnnotations;

namespace TouristCenter.Storage.Interfaces.Tour.Models
{
    public sealed class Apartment
    {
        [Required]
        public int ApartmentId { get; set; }
        [Required]
        [MaxLength(1000)]
        public string Conveniences { get; set; }
    }
}
