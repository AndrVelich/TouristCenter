using System;
using System.Collections.Generic;
using Travelx.Domain.Interfaces.Promotion.Models;

namespace Travelx.Domain.Interfaces.Promotion.Managers
{
    public interface IPromotionManager
    {
        IPromotion GetPromotion(int id);
        IPromotion GetPromotion(string promotionUrl);
        IPromotion GetActivePromotion(string promotionUrl);
        IReadOnlyCollection<IPromotion> GetPromotionCollection();
        IReadOnlyCollection<IPromotion> GetActivePromotionCollection();
        IPromotion CreatePromotion(string name,
            string urlName,
            string description,
            DateTime untilDate,
            bool isActive);
    }
}
