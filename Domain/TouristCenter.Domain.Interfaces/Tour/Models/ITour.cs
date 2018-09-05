namespace TouristCenter.Domain.Interfaces.Tour.Models
{
    public interface ITour
    {
        int TourId { get; }
        string Name { get; set; }
        string Description { get; set; }
        bool IsTransferIncluded { get; set; }
        decimal Price { get; set; }
        bool IsHot { get; set; }
        IHotel Hotel { get; set; }

        void CreateTour();
        void UpdateTour();
    }
}
