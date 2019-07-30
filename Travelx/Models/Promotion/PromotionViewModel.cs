using System;
using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Interfaces.Promotion.Models;

namespace Travelx.Models.Promotion
{
    public sealed class PromotionViewModel
    {
        public int PromotionId { get; set; }

        public string Name { get; set; }

        public string UrlName { get; set; }

        public string Description { get; set; }

        public DateTime UntilDate { get; set; }

        public string Title { get; set; }

        public string MetaDescription { get; set; }

        public string MetaKeywords { get; set; }

        public List<string> NewImageCollection { get; set; }

        public List<int> OldImageCollection { get; set; }

        public PromotionViewModel(IPromotion promotion)
        {
            PromotionId = promotion.PromotionId;
            Name = promotion.Name;
            UrlName = promotion.UrlName;
            Description = promotion.Description;
            UntilDate = promotion.UntilDate;
            Title = promotion.Title;
            MetaDescription = promotion.MetaDescription;
            MetaKeywords = promotion.MetaKeywords;

            NewImageCollection = new List<string>();
            OldImageCollection = promotion.ImageIdCollection.ToList();
        }

        public PromotionViewModel()
        {
            NewImageCollection = new List<string>();
            OldImageCollection = new List<int>();
        }
    }
}