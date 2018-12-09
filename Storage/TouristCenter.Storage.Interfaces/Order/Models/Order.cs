using System;
using System.ComponentModel.DataAnnotations;

namespace TouristCenter.Storage.Interfaces.Order.Models
{
    public sealed class Order
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }
        [Required]
        [MaxLength(200)]
        public string Phone { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
        [Required]
        public bool IsNew { get; set; }
        [Required]
        public DateTime CreatedDateTime { get; set; }
        public string Url { get; set; }
        public string TourOrButton { get; set; }
    }
}
