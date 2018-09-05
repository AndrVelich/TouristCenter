namespace TouristCenter.Storage.Interfaces.Tour.Managers
{
    public interface ITourDataManager
    {
        Models.Tour GetTour(int tourId);
        void UpdateTour(Models.Tour tourDataModel);
        void CreateTour(Models.Tour tourDataModel);
    }
}
