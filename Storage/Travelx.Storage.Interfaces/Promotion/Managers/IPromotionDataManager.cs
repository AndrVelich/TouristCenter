using System.Collections.Generic;

namespace Travelx.Storage.Interfaces.Promotion.Managers
{
    public interface IPromotionDataManager
    {
        Models.Promotion GetPromotion(int promotionId);
        Models.Promotion GetPromotion(string promotionUrl);
        IReadOnlyCollection<Models.Promotion> GetPromotionCollection();
        IReadOnlyCollection<Models.Promotion> GetActivePromotionCollection();
        void UpdatePromotion(Models.Promotion promotionDataModel);
        Models.Promotion CreatePromotion(Models.Promotion promotionDataModel);
        void DeletePromotion(Models.Promotion promotionDataModel);
        bool CheckPromotionUnique(Models.Promotion promotionDataModel);
    }
}
