using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TouristCenter.Domain.Interfaces.Promotion.Exceptions;
using TouristCenter.Domain.Interfaces.Promotion.Managers;
using TouristCenter.Domain.Interfaces.Promotion.Models;
using TouristCenter.Domain.Interfaces.Image.Managers;
using TouristCenter.Helpers.Converters;
using TouristCenter.Models.Promotion;

namespace TouristCenter.Controllers
{
    public class PromotionController : ApiController
    {
        private readonly IPromotionManager _promotionManager;
        private readonly IImageManager _imageManager;

        public PromotionController(IPromotionManager promotionManager,
            IImageManager imageManager)
        {
            _promotionManager = promotionManager;
            _imageManager = imageManager;
        }

        [HttpGet]
        [Route("api/promotion/{promotionUrl}")]
        public PromotionViewModel GetPromotion(string promotionUrl)
        {
            var promotion = _promotionManager.GetPromotion(promotionUrl);
            var promotionViewModel = new PromotionViewModel(promotion);

            return promotionViewModel;
        }

        [HttpGet]
        [Route("api/promotions")]
        public List<PromotionViewModel> GetCollection()
        {
            var promotions = _promotionManager.GetPromotionCollection();
            var result = promotions.Select(c => new PromotionViewModel(c)).ToList();

            return result;
        }

        [Authorize]
        public void Post(PromotionViewModel promotion)
        {
            IPromotion promotionModel;
            try
            {
                promotionModel = _promotionManager.GetPromotion(promotion.PromotionId);
                promotionModel.Name = promotion.Name;
                promotionModel.UrlName = promotion.UrlName;
                promotionModel.Description = promotion.Description;
                promotionModel.UntilDate = promotion.UntilDate;
            }
            catch (PromotionNotFoundException)
            {
                promotionModel = _promotionManager.CreatePromotion(
                        promotion.Name,
                        promotion.UrlName,
                        promotion.Description,
                        promotion.UntilDate
                    );
            }

            var imageForDeleteCollection = promotionModel.ImageCollection.Where(im => !promotion.OldImageCollection.Contains(im.ImageId)).ToList();

            foreach (var newImage in promotion.NewImageCollection)
            {
                var mimeType = ImageConverter.GetImageMimeType(newImage);
                var imageData = ImageConverter.GetImageData(newImage);

                promotionModel.AddImage(imageData, mimeType);
            }

            foreach (var newImage in imageForDeleteCollection)
            {
                promotionModel.DeleteImage(newImage);
            }

            promotionModel.Save();
        }

        [Authorize]
        [HttpDelete]
        [Route("api/promotion/{id}")]
        public void Delete(int id)
        {
            var promotion = _promotionManager.GetPromotion(id);
            promotion.Delete();
        }

    }
}
