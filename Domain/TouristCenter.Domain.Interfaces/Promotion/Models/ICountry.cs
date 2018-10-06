using System;
using System.Collections.Generic;
using TouristCenter.Domain.Interfaces.Image.Models;

namespace TouristCenter.Domain.Interfaces.Promotion.Models
{
    public interface IPromotion
    {
        int PromotionId { get; }

        string Name { get; set; }

        string UrlName { get; set; }

        string Description { get; set; }

        DateTime UntilDate { get; set; }

        IReadOnlyCollection<IImage> ImageCollection { get; }

        void Save();
        void Delete();

        void AddImage(byte[] imageData, string mimeType);
        void DeleteImage(IImage image);
    }
}
