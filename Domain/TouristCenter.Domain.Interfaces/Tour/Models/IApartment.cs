namespace TouristCenter.Domain.Interfaces.Tour.Models
{
    public interface IApartment
    {
        int ApartmentId { get; }
        string Conveniences { get; set; }

        void CreateApartment();
        void UpdateApartment();
    }
}
