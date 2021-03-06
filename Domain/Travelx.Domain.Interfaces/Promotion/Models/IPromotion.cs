﻿using System;
using System.Collections.Generic;

namespace Travelx.Domain.Interfaces.Promotion.Models
{
    public interface IPromotion
    {
        int PromotionId { get; }

        string Name { get; set; }

        string UrlName { get; set; }

        string Description { get; set; }

        DateTime UntilDate { get; set; }

        string Title { get; set; }

        bool IsActive { get; set; }

        string MetaDescription { get; set; }

        string MetaKeywords { get; set; }

        IReadOnlyCollection<int> ImageIdCollection { get; }

        void Save();
        void Delete();

        void AddImage(int imageId);

        void DeleteImage(int imageId);
    }
}
