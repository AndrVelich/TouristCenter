namespace TouristCenter.Models.Tour
{
    public sealed class TourViewModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsTransferIncluded { get; set; }
        public decimal Price { get; set; }
        public bool IsHot { get; set; }

        public HotelViewModel Hotel { get; set; }
    }
}