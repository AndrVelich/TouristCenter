using System;
using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Interfaces.Promotion.Models;

namespace TouristCenter.Models.Promotion
{
    public sealed class PromotionViewModel
    {
        public int PromotionId { get; set; }

        public string Name { get; set; }

        public string UrlName { get; set; }

        public string Description { get; set; }

        public DateTime UntilDate { get; set; }

        public List<string> NewImageCollection { get; set; }

        public List<int> OldImageCollection { get; set; }

        public PromotionViewModel(IPromotion promotion)
        {
            PromotionId = promotion.PromotionId;
            Name = promotion.Name;
            UrlName = promotion.UrlName;
            Description = promotion.Description;
            UntilDate = promotion.UntilDate;
            NewImageCollection = new List<string>();
            OldImageCollection = promotion.ImageCollection.Select(i => i.ImageId).ToList();
        }

        public PromotionViewModel()
        {
            NewImageCollection = new List<string>();
            OldImageCollection = new List<int>();
        }
    }
}