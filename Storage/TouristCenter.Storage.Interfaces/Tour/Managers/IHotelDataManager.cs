namespace TouristCenter.Storage.Interfaces.Tour.Managers
{
    public interface IHotelDataManager
    {
        Models.Hotel GetHotel(int hotelId);
        void UpdateHotel(Models.Hotel hotelDataModel);
        void CreateHotel(Models.Hotel hotelDataModel);
    }
}
