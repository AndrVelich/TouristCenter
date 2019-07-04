using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Interfaces.Tour.Models;
using Travelx.Helpers.Converters;

namespace Travelx.Models.Tour
{
    public sealed class TourViewModel
    {
        public int TourId { get; set; }
        public string Name { get; set; }
        public string UrlName { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public decimal Price { get; set; }
        public int Stars { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public int Nights { get; set; }
        public bool IsFlightIncluded { get; set; }

        public List<string> NewImageCollection { get; set; }
        public List<int> OldImageCollection { get; set; }

        public TourViewModel(ITour tour)
        {
            TourId = tour.TourId;
            Name = tour.Name;
            UrlName = tour.UrlName;
            City = tour.City;
            Category = TourTypesConverter.ConvertToString(tour.Category);
            Price = tour.Price;
            Stars = tour.Stars;
            Description = tour.Description;
            Country = tour.Country;
            Nights = tour.Nights;
            IsFlightIncluded = tour.IsFlightIncluded;
            NewImageCollection = new List<string>();
            OldImageCollection = tour.ImageCollection.Select(i => i.ImageId).ToList();
        }

        public TourViewModel()
        {
            NewImageCollection = new List<string>();
            OldImageCollection = new List<int>();
        }
    }
}