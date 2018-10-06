using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Promotion.Managers;
using PromotionDataModel = TouristCenter.Storage.Interfaces.Promotion.Models.Promotion;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;

namespace TouristCenter.Storage.Promotion.Managers
{
    public sealed class PromotionDataManager : IPromotionDataManager
    {
        private readonly TouristCenterContext _dbContext;

        public PromotionDataManager(string connectionString)
        {
            _dbContext = new TouristCenterContext();
        }

        public PromotionDataModel GetPromotion(int promotionId)
        {
            var promotion = _dbContext.Promotions
                .AsNoTracking()
                .FirstOrDefault(c => c.PromotionId == promotionId);
            return promotion;
        }

        public PromotionDataModel GetPromotion(string promotionUrl)
        {
            var promotion = _dbContext.Promotions
                .AsNoTracking()
                .FirstOrDefault(p => p.UrlName == promotionUrl);
            return promotion;
        }

        public IReadOnlyCollection<PromotionDataModel> GetPromotionCollection()
        {
            var countries = _dbContext.Promotions.AsNoTracking().ToList();
            return countries;
        }

        public PromotionDataModel CreatePromotion(PromotionDataModel promotionDataModel)
        {
            var result = _dbContext.Promotions.Add(promotionDataModel);
            _dbContext.SaveChanges();

            return result;
        }

        public void UpdatePromotion(PromotionDataModel promotionDataModel)
        {
            var images = promotionDataModel.Images;
            promotionDataModel.Images = new HashSet<ImageDataModel>();

            var entry = _dbContext.Entry(promotionDataModel);
            entry.State = EntityState.Modified;
            entry.Collection(c => c.Images).Load();

            UpdateImages(promotionDataModel, images);

            _dbContext.SaveChanges();
        }

        public void DeletePromotion(PromotionDataModel promotionDataModel)
        {
            promotionDataModel.Images = new HashSet<ImageDataModel>();
            var entry = _dbContext.Entry(promotionDataModel);
            entry.Collection(c => c.Images).Load();

            _dbContext.Promotions.Remove(promotionDataModel);
            foreach (var image in promotionDataModel.Images)
            {
                _dbContext.Images.Remove(image);
            }
           

            _dbContext.SaveChanges();
        }

        public bool CheckPromotionUnique(PromotionDataModel promotionDataModel)
        {
            var result = _dbContext.Promotions.AsNoTracking().FirstOrDefault(c => c.PromotionId != promotionDataModel.PromotionId
                                            && c.UrlName == promotionDataModel.UrlName) == null;
            return result;
        }

        private void UpdateImages(PromotionDataModel promotionDataModel, ICollection<ImageDataModel> images)
        {
            var newImageCollection = images.Where(i => !promotionDataModel.Images.Any(db => db.ImageId == i.ImageId)).ToList();

            foreach (var newImage in newImageCollection)
            {
                promotionDataModel.Images.Add(newImage);
            }

            var imageForDeleteCollection = promotionDataModel.Images.Where(db => !images.Any(i => i.ImageId == db.ImageId)).ToList();

            foreach (var imageForDelete in imageForDeleteCollection)
            {
                promotionDataModel.Images.Remove(imageForDelete);
                _dbContext.Images.Remove(imageForDelete);
            }
        }
    }
}
