using System.Collections.Generic;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Image.Models;

namespace Travelx.Domain.Interfaces.Country.Models
{
    public interface ICountry
    {
        int CountryId { get; }

        string Name { get; set; }

        string UrlName { get; set; }

        TourTypesEnum Category { get; set; }

        decimal ThreeStarsPrice { get; set; }

        decimal FourStarsPrice { get; set; }

        decimal FiveStarsPrice { get; set; }

        string Description { get; set; }

        string PageContent { get; set; }

        string PageContentBottom { get; set; }

        string Title { get; set; }

        string MetaDescription { get; set; }

        string MetaKeywords { get; set; }

        string PageHeader { get; set; }

        IReadOnlyCollection<int> ImageIdCollection { get; }

        void Save();

        void Delete();

        void AddImage(int imageId);

        void DeleteImage(int imageId);
    }
}
