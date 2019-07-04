using System;
using System.Collections.Generic;
using Travelx.Domain.Interfaces.Promotion.Models;

namespace Travelx.Domain.Interfaces.Promotion.Managers
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
