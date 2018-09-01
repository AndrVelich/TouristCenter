using System.Collections.Generic;

namespace TouristCenter.Models.Tour
{
    public sealed class TourViewModel
    {
        public string Name { get; set; }
        public string Description1 { get; set; }
        public string Description2 { get; set; }
        public string Description3 { get; set; }
        public int DaysCount { get; set; }
        public bool IsTransferIncluded { get; set; }
        public decimal Price { get; set; }
        public int Stars { get; set; }
        public string Country { get; set; }
        public string City { get; set; }

        public List<string> ImageIdCollection { get; set; }
    }
}