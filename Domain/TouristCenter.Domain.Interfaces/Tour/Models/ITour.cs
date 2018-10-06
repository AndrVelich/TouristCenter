using System.Collections.Generic;
using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Image.Models;

namespace TouristCenter.Domain.Interfaces.Tour.Models
{
    public interface ITour
    {
        int TourId { get; }

        string Name { get; set; }

        string UrlName { get; set; }

        string City { get; set; }

        TourTypesEnum Category { get; set; }

        decimal Price { get; set; }

        int Stars { get; set; }

        string Description { get; set; }

        string Country { get; set; }

        int Nights { get; set; }

        bool IsFlightIncluded { get; set; }

        IReadOnlyCollection<IImage> ImageCollection { get; }

        void Save();
        void Delete();

        void AddImage(byte[] imageData, string mimeType);
        void DeleteImage(IImage image);
    }
}
