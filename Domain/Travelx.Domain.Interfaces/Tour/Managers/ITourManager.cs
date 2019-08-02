using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Common.Page;
using Travelx.Domain.Interfaces.Tour.Filter;
using Travelx.Domain.Interfaces.Tour.Models;

namespace Travelx.Domain.Interfaces.Tour.Managers
{
    public interface ITourManager
    {
        ITour GetTour(int id);
        ITour GetTour(TourTypesEnum tourType, string countryUrl, string tourUr);
        PageModel<ITour> GetToursPage(TourFilter filter);
        ITour CreateTour(string name,
            string urlName,
            string city,
            TourTypesEnum category,
            decimal price,
            int stars,
            string description,
            string country,
            int nights,
            bool isFlightIncluded);
    }
}
