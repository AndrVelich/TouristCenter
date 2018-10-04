using System.Collections.Generic;
using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Image.Models;

namespace TouristCenter.Domain.Interfaces.Country.Models
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

        IReadOnlyCollection<IImage> ImageCollection { get; }

        void Save();
        void Delete();

        void AddImage(byte[] imageData, string mimeType);
        void DeleteImage(IImage image);
    }
}
