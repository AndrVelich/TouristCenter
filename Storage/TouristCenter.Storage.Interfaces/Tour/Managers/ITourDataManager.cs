using System.Collections.Generic;

namespace TouristCenter.Storage.Interfaces.Tour.Managers
{
    public interface ITourDataManager
    {
        Models.Tour GetTour(int tourId);
        Models.Tour GetTour(string tourType, string countryUrl, string tourUrl);
        IReadOnlyCollection<Models.Tour> GetTourCollection(string tourType, string countryUrl);
        IReadOnlyCollection<Models.Tour> GetTourCollection(string tourType);
        IReadOnlyCollection<Models.Tour> GetTourCollection();
        void UpdateTour(Models.Tour tourDataModel);
        Models.Tour CreateTour(Models.Tour tourDataModel);
        void DeleteTour(Models.Tour tourDataModel);
        bool CheckTourUnique(Models.Tour tourDataModel);
    }
}
