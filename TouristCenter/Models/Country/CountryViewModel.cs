using System.Collections.Generic;

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

        public CountryViewModel()
        {
            NewImageCollection = new List<string>();
            OldImageCollection = new List<int>();
        }
    }
}