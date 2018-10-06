using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Interfaces.Promotion.Exceptions;
using TouristCenter.Domain.Interfaces.Promotion.Managers;
using TouristCenter.Domain.Interfaces.Promotion.Models;
using TouristCenter.Storage.Interfaces.Promotion.Managers;
using TouristCenter.Storage.Interfaces.Image.Managers;
using PromotionModel = TouristCenter.Domain.Promotion.Models.Promotion;
using System;

namespace TouristCenter.Domain.Promotion.Managers
{
    public sealed class PromotionManager : IPromotionManager
    {
        private readonly IPromotionDataManager _promotionDataManager;
        private readonly IImageDataManager _imageDataManager;

        public PromotionManager(IPromotionDataManager promotionDataManager, IImageDataManager imageDataManager)
        {
            _promotionDataManager = promotionDataManager;
            _imageDataManager = imageDataManager;
        }

        public IPromotion GetPromotion(int id)
        {
            var promotionDataModel = _promotionDataManager.GetPromotion(id);
            if(promotionDataModel == null)
            {
                throw new PromotionNotFoundException();
            }

            var promotion = new PromotionModel(promotionDataModel, _promotionDataManager, _imageDataManager);

            return promotion;
        }

        public IPromotion GetPromotion(string promotionUrl)
        {
            var promotionDataModel = _promotionDataManager.GetPromotion( promotionUrl);
            if (promotionDataModel == null)
            {
                throw new PromotionNotFoundException();
            }

            var promotion = new PromotionModel(promotionDataModel, _promotionDataManager, _imageDataManager);

            return promotion;
        }

        public IReadOnlyCollection<IPromotion> GetPromotionCollection()
        {
            var promotions = _promotionDataManager.GetPromotionCollection()
                .Select(c => new PromotionModel(c, _promotionDataManager, _imageDataManager))
                .ToList();

            return promotions;
        }

        public IPromotion CreatePromotion(
            string name,
            string urlName,
            string description,
            DateTime untilDate)
        {
            var promotion = new PromotionModel(
                _promotionDataManager,
                _imageDataManager,
                name,
                urlName,
                description,
                untilDate
               );

            return promotion;
        }
    }
}
