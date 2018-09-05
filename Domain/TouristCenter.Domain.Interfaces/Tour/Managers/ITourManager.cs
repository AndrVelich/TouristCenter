using TouristCenter.Domain.Interfaces.Tour.Models;

namespace TouristCenter.Domain.Interfaces.Tour.Managers
{
    public interface ITourManager
    {
        ITour GetTour(int tourId);
        ITour CreateTour
            (
            string name,
            decimal price,
            IHotel hotel
            );
    }
}