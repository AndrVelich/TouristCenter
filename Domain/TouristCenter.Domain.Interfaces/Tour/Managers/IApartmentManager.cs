using TouristCenter.Domain.Interfaces.Tour.Models;

namespace TouristCenter.Domain.Interfaces.Tour.Managers
{
    public interface IApartmentManager
    {
        IApartment GetApartment (int apartmentId);
        IApartment CreateApartment (string Conveniences);
    }
}
