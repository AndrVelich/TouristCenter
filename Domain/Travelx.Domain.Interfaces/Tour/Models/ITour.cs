using System.Collections.Generic;
using Travelx.Domain.Interfaces.Common.Enums;

namespace Travelx.Domain.Interfaces.Tour.Models
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

        IReadOnlyCollection<int> ImageIdCollection { get; }

        void Save();
        void Delete();

        void AddImage(int imageId);

        void DeleteImage(int imageId);
    }
}
