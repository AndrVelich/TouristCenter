using System.Collections.Generic;
using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Tour.Models;

namespace TouristCenter.Domain.Interfaces.Tour.Managers
{
    public interface ITourManager
    {
        ITour GetTour(int id);
        ITour GetTour(TourTypesEnum tourType, string countryUrl, string tourUr);
        IReadOnlyCollection<ITour> GetTourCollection();
        IReadOnlyCollection<ITour> GetTourCollection(TourTypesEnum tourType);
        IReadOnlyCollection<ITour> GetTourCollection(TourTypesEnum tourType, string countryUrl);
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
