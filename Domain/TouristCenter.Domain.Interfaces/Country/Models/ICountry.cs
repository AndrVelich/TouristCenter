using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouristCenter.Domain.Interfaces.Common.Enums;

namespace TouristCenter.Domain.Interfaces.Country.Models
{
    public interface ICountry
    {
        string Name { get; set; }

        string UrlName { get; set; }

        TourTypesEnum Category { get; set; }

        decimal ThreeStarsPrice { get; set; }

        decimal FourStarsPrice { get; set; }

        decimal FiveStarsPrice { get; set; }

        string Description { get; set; }

        string PageContent { get; set; }

        IReadOnlyCollection<int> ImageIdCollection { get; set; }

        void Save();
        void Delete();

    }
}
