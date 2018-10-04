using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Interfaces.Country.Models;
using TouristCenter.Helpers.Converters;

namespace TouristCenter.Models.Country
{
    public sealed class CountryViewModel
    {
        public int CountryId { get; set; }

        public string Name { get; set; }

        public string UrlName { get; set; }

        public string Category { get; set; }

        public decimal ThreeStarsPrice { get; set; }

        public decimal FourStarsPrice { get; set; }

        public decimal FiveStarsPrice { get; set; }

        public string Description { get; set; }

        public string PageContent { get; set; }

        public List<string> NewImageCollection { get; set; }

        public List<int> OldImageCollection { get; set; }

        public CountryViewModel(ICountry country)
        {
            CountryId = country.CountryId;
            Name = country.Name;
            UrlName = country.UrlName;
            Category = TourTypesConverter.ConvertToString(country.Category);
            ThreeStarsPrice = country.ThreeStarsPrice;
            FourStarsPrice = country.FourStarsPrice;
            FiveStarsPrice = country.FiveStarsPrice;
            Description = country.Description;
            PageContent = country.PageContent;
            NewImageCollection = new List<string>();
            OldImageCollection = country.ImageCollection.Select(i => i.ImageId).ToList();
        }

        public CountryViewModel()
        {
            NewImageCollection = new List<string>();
            OldImageCollection = new List<int>();
        }
    }
}