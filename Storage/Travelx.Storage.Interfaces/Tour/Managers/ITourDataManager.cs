using Travelx.Storage.Interfaces.Common.Page;
using Travelx.Storage.Interfaces.Tour.Filter;

namespace Travelx.Storage.Interfaces.Tour.Managers
{
    public interface ITourDataManager
    {
        Models.Tour GetTour(int tourId);
        Models.Tour GetTour(string tourType, string countryUrl, string tourUrl);
        PageDataModel<Models.Tour> GetToursPage(TourDataFilter filter);
        void UpdateTour(Models.Tour tourDataModel);
        Models.Tour CreateTour(Models.Tour tourDataModel);
        void DeleteTour(Models.Tour tourDataModel);
        bool CheckTourUnique(Models.Tour tourDataModel);
    }
}
