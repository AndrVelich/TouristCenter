using TouristCenter.Domain.Interfaces.Tour.Exceptions;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Domain.Interfaces.Tour.Models;
using TouristCenter.Storage.Interfaces.Tour.Managers;

namespace TouristCenter.Domain.Tour.Managers
{
    public sealed class ApartmentManager : IApartmentManager
    {
        private readonly IApartmentDataManager _apartmentDataManager;
        
        public ApartmentManager(IApartmentDataManager apartmentDataManager)
        {
            _apartmentDataManager = apartmentDataManager;
        }

        public IApartment GetApartment(int apartmentId)
        {
            var apartmentDataModel = _apartmentDataManager.GetApartment(apartmentId);
            if (apartmentDataModel == null)
            {
                throw new ApartmentNotFoundException();
            }
            var apartment = new Models.Apartment(apartmentDataModel, _apartmentDataManager);
            return apartment;
        }

        public IApartment CreateApartment(string conveniences)
        {

            var apartment = new Models.Apartment(_apartmentDataManager,conveniences);
            return apartment;
        }
    }
}
