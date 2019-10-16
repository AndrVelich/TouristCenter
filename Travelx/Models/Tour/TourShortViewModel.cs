using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Interfaces.Tour.Models;
using Travelx.Helpers.Converters;

namespace Travelx.Models.Tour
{
    public sealed class TourShortViewModel
    {
        public int TourId { get; set; }
        public string Name { get; set; }
        public string UrlName { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public decimal Price { get; set; }
        public int Stars { get; set; }
        public string Country { get; set; }
        public int Nights { get; set; }
        public bool IsFlightIncluded { get; set; }

        public List<int> OldImageCollection { get; set; }

        public TourShortViewModel(ITour tour)
        {
            TourId = tour.TourId;
            Name = tour.Name;
            UrlName = tour.UrlName;
            City = tour.City;
            Category = TourTypesConverter.ConvertToString(tour.Category);
            Price = tour.Price;
            Stars = tour.Stars;
            Country = tour.Country;
            Nights = tour.Nights;
            IsFlightIncluded = tour.IsFlightIncluded;
            OldImageCollection = tour.ImageIdCollection.ToList();
        }

        public TourShortViewModel()
        {
            OldImageCollection = new List<int>();
        }
    }
}