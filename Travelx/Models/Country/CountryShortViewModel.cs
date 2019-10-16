using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Interfaces.Country.Models;
using Travelx.Helpers.Converters;

namespace Travelx.Models.Country
{
    public sealed class CountryShortViewModel
    {
        public int CountryId { get; set; }

        public string Name { get; set; }

        public string UrlName { get; set; }

        public string Category { get; set; }

        public decimal ThreeStarsPrice { get; set; }

        public decimal FourStarsPrice { get; set; }

        public decimal FiveStarsPrice { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public List<int> OldImageCollection { get; set; }

        public CountryShortViewModel(ICountry country)
        {
            CountryId = country.CountryId;
            Name = country.Name;
            UrlName = country.UrlName;
            Category = TourTypesConverter.ConvertToString(country.Category);
            ThreeStarsPrice = country.ThreeStarsPrice;
            FourStarsPrice = country.FourStarsPrice;
            FiveStarsPrice = country.FiveStarsPrice;
            Description = country.Description;
            Title = country.Title;
            OldImageCollection = country.ImageIdCollection.ToList();
        }

        public CountryShortViewModel()
        {
            OldImageCollection = new List<int>();
        }
    }
}