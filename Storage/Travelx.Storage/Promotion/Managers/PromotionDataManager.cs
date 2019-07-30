using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Travelx.Storage.Context;
using Travelx.Storage.Interfaces.Promotion.Managers;
using Travelx.Storage.Interfaces.Promotion.Models;
using PromotionDataModel = Travelx.Storage.Interfaces.Promotion.Models.Promotion;

namespace Travelx.Storage.Promotion.Managers
{
    public sealed class PromotionDataManager : IPromotionDataManager
    {
        private readonly TravelxContext _dbContext;

        public PromotionDataManager(TravelxContext dbContext)
        {
            _dbContext = dbContext;
        }

        public PromotionDataModel GetPromotion(int promotionId)
        {
            var promotion = _dbContext.Promotions
                .Include(t => t.PromotionImages)
                .AsNoTracking()
                .FirstOrDefault(c => c.PromotionId == promotionId);
            return promotion;
        }

        public PromotionDataModel GetPromotion(string promotionUrl)
        {
            var promotion = _dbContext.Promotions
                .Include(t => t.PromotionImages)
                .AsNoTracking()
                .FirstOrDefault(p => p.UrlName == promotionUrl);
            return promotion;
        }

        public IReadOnlyCollection<PromotionDataModel> GetPromotionCollection()
        {
            var countries = _dbContext.Promotions
                .Include(t => t.PromotionImages)
                .AsNoTracking()
                .ToList();
            return countries;
        }

        public PromotionDataModel CreatePromotion(PromotionDataModel promotionDataModel)
        {
            var result = _dbContext.Promotions.Add(promotionDataModel).Entity;
            _dbContext.SaveChanges();

            return result;
        }

        public void UpdatePromotion(PromotionDataModel promotionDataModel)
        {
            var promotionImages = promotionDataModel.PromotionImages;
            promotionDataModel.PromotionImages = new HashSet<PromotionImage>();

            var entry = _dbContext.Entry(promotionDataModel);
            entry.State = EntityState.Modified;
            entry.Collection(c => c.PromotionImages).Load();

            UpdateImages(promotionDataModel, promotionImages);

            _dbContext.SaveChanges();
        }

        public void DeletePromotion(PromotionDataModel promotionDataModel)
        {
            var promotion = _dbContext.Promotions
                .Include(p => p.PromotionImages)
                .FirstOrDefault(p => p.PromotionId == promotionDataModel.PromotionId);

            if (promotion != null)
            {
                RemovePromotionImages(promotion);
                _dbContext.Promotions.Remove(promotion);

                _dbContext.SaveChanges();
            }

            
            
        }

        public bool CheckPromotionUnique(PromotionDataModel promotionDataModel)
        {
            var result = _dbContext.Promotions.AsNoTracking().FirstOrDefault(c => c.PromotionId != promotionDataModel.PromotionId
                                            && c.UrlName == promotionDataModel.UrlName) == null;
            return result;
        }

        #region [Remove]

        private void RemovePromotionImages(PromotionDataModel promotionDataModel)
        {
            var promotionImageCollection = promotionDataModel.PromotionImages?.ToList();
            if (promotionImageCollection != null && promotionImageCollection.Any())
            {
                foreach (var promotionImage in promotionImageCollection)
                {
                    var image = promotionImage.Image;
                    if (image != null)
                    {
                        _dbContext.Images.Remove(image);
                    }
                }
            }
        }

        #endregion

        private void UpdateImages(PromotionDataModel promotionDataModel, ICollection<PromotionImage> promotionImages)
        {
            var newImageCollection = promotionImages.Where(i => promotionDataModel.PromotionImages
                    .All(db => db.ImageId != i.ImageId && db.Image != null))
                .Select(pi => pi.Image)
                .ToList();

            foreach (var newImage in newImageCollection)
            {
                _dbContext.Images.Add(newImage);
                var promotionImage = new PromotionImage
                {
                    PromotionId = promotionDataModel.PromotionId,
                    Image = newImage
                };
                promotionDataModel.PromotionImages.Add(promotionImage);
            }

            var promotionImageForDeleteCollection = promotionDataModel.PromotionImages.Where(db => promotionImages.All(i => i.ImageId != db.ImageId)).ToList();

            foreach (var promotionImageForDelete in promotionImageForDeleteCollection)
            {
                promotionDataModel.PromotionImages.Remove(promotionImageForDelete);
                _dbContext.Images.Remove(promotionImageForDelete.Image);
            }
        }
    }
}
