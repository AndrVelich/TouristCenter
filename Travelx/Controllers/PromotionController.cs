using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Travelx.Domain.Interfaces.Image.Managers;
using Travelx.Domain.Interfaces.Image.Models;
using Travelx.Domain.Interfaces.Promotion.Exceptions;
using Travelx.Domain.Interfaces.Promotion.Managers;
using Travelx.Domain.Interfaces.Promotion.Models;
using Travelx.Helpers.Converters;
using Travelx.Models.Promotion;

namespace Travelx.Controllers
{
    public class PromotionController : Controller
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
        [Authorize]
        [Route("api/promotion/{promotionUrl}")]
        public PromotionViewModel GetPromotion(string promotionUrl)
        {
            var promotion = _promotionManager.GetPromotion(promotionUrl);
            var promotionViewModel = new PromotionViewModel(promotion);

            return promotionViewModel;
        }

        [HttpGet]
        [Route("api/promotion/active/{promotionUrl}")]
        public PromotionViewModel GetActivePromotion(string promotionUrl)
        {
            var promotion = _promotionManager.GetActivePromotion(promotionUrl);
            var promotionViewModel = new PromotionViewModel(promotion);

            return promotionViewModel;
        }

        [HttpGet]
        [Authorize]
        [Route("api/promotions")]
        public List<PromotionViewModel> GetCollection()
        {
            var promotions = _promotionManager.GetPromotionCollection();
            var result = promotions.Select(c => new PromotionViewModel(c)).ToList();

            return result;
        }

        [HttpGet]
        [Route("api/promotions/active")]
        public List<PromotionViewModel> GetActiveCollection()
        {
            var promotions = _promotionManager.GetActivePromotionCollection();
            var result = promotions.Select(c => new PromotionViewModel(c)).ToList();

            return result;
        }

        [Authorize]
        [Route("api/promotion")]
        public void Post([FromBody]PromotionViewModel promotion)
        {
            IPromotion promotionModel;
            try
            {
                promotionModel = _promotionManager.GetPromotion(promotion.PromotionId);
                promotionModel.Name = promotion.Name;
                promotionModel.UrlName = promotion.UrlName;
                promotionModel.Description = promotion.Description;
                promotionModel.UntilDate = promotion.UntilDate;
                promotionModel.IsActive = promotion.IsActive;
            }
            catch (PromotionNotFoundException)
            {
                promotionModel = _promotionManager.CreatePromotion(
                        promotion.Name,
                        promotion.UrlName,
                        promotion.Description,
                        promotion.UntilDate,
                        promotion.IsActive
                    );
            }

            promotionModel.Title = promotion.Title;
            promotionModel.MetaDescription = promotion.MetaDescription;
            promotionModel.MetaKeywords = promotion.MetaKeywords;

            var imageForDeleteCollection = promotionModel.ImageIdCollection.Where(imageId => !promotion.OldImageCollection.Contains(imageId)).ToList();

            foreach (var newImage in promotion.NewImageCollection)
            {
                var image = CreateImage(newImage);
                promotionModel.AddImage(image.ImageId);
            }

            foreach (var imageId in imageForDeleteCollection)
            {
                promotionModel.DeleteImage(imageId);
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

        private IImage CreateImage(string rawImage)
        {
            var mimeType = ImageConverter.GetImageMimeType(rawImage);
            var imageData = ImageConverter.GetImageData(rawImage);
            var image = _imageManager.CreateImage(mimeType, imageData);

            return image;
        }

    }
}
