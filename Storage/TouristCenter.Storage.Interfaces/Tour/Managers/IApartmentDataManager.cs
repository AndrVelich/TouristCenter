namespace TouristCenter.Storage.Interfaces.Tour.Managers
{
    public interface IApartmentDataManager
    {
        Models.Apartment GetApartment(int apartmentId);
        void UpdateApartment(Models.Apartment apartmenDataModel);
        void CreateApartment(Models.Apartment apartmenDataModel);
    }
}
