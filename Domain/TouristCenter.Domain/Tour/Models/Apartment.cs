using TouristCenter.Domain.Interfaces.Tour.Models;
using TouristCenter.Domain.Interfaces.Tour.Exceptions;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Storage.Interfaces.Tour.Managers;

namespace TouristCenter.Domain.Tour.Models
{
    internal sealed class Apartment : IApartment
    {
        private readonly IApartmentDataManager _apartmentDataManager;
        
        private string _conveniences;

        public int ApartmentId { get; private set; }

        public string Conveniences
        {
            get { return _conveniences; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ApartmentConveniencesNotValidException();
                }
                _conveniences = value;
            }
        }

        internal Apartment(
            Storage.Interfaces.Tour.Models.Apartment dataModel,
            IApartmentDataManager apartmentDataManager
            )
        {
            _apartmentDataManager = apartmentDataManager;
            _conveniences = dataModel.Conveniences;
        }

        internal Apartment(
            IApartmentDataManager apartmentDataManager,
            string convinience
            )
        {
            Conveniences = convinience;
            _apartmentDataManager = apartmentDataManager;    
        }

        public void CreateApartment()
        {
            var apartmentDataModel = ConvertApartmentToDataModel();
            _apartmentDataManager.CreateApartment(apartmentDataModel);
        }

        public void UpdateApartment()
        {
            var apartmentDataModel = ConvertApartmentToDataModel();
            _apartmentDataManager.UpdateApartment(apartmentDataModel);
        }

        #region [private]

        private Storage.Interfaces.Tour.Models.Apartment ConvertApartmentToDataModel()
        {
            var apartmentDataModel = new Storage.Interfaces.Tour.Models.Apartment
            {
                ApartmentId = ApartmentId,
                Conveniences = Conveniences
            };
            return apartmentDataModel;
        }

        #endregion
    }
}
