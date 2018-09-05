using TouristCenter.Domain.Interfaces.Tour.Models;

namespace TouristCenter.Domain.Interfaces.Tour.Managers
{
    public interface IHotelManager
    {
        IHotel GetHotel(int hotelId);
        IHotel CreateHotel(string name, int stars, string country);
    }
}