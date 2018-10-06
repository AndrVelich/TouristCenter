using System;
using System.Collections.Generic;
using TouristCenter.Domain.Interfaces.Promotion.Models;

namespace TouristCenter.Domain.Interfaces.Promotion.Managers
{
    public interface IPromotionManager
    {
        IPromotion GetPromotion(int id);
        IPromotion GetPromotion(string promotionUrl);
        IReadOnlyCollection<IPromotion> GetPromotionCollection();
        IPromotion CreatePromotion(string name,
            string urlName,
            string description,
            DateTime untilDate);
    }
}
