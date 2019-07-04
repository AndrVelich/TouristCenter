using System;
using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Interfaces.Image.Models;
using Travelx.Domain.Interfaces.Promotion.Exceptions;
using Travelx.Domain.Interfaces.Promotion.Models;
using Travelx.Storage.Interfaces.Image.Managers;
using Travelx.Storage.Interfaces.Promotion.Managers;
using Travelx.Storage.Interfaces.Promotion.Models;
using PromotionDataModel = Travelx.Storage.Interfaces.Promotion.Models.Promotion;
using ImageModel = Travelx.Domain.Image.Models.Image;

namespace Travelx.Domain.Promotion.Models
{
    internal sealed class Promotion : IPromotion
    {
        private readonly IPromotionDataManager _promotionDataManager;
        private readonly IImageDataManager _imageDataManager;

        private bool _isNew;

        private string _name;
        private string _urlName;
        private string _description;
        private DateTime _untilDate;
        private List<ImageModel> _imageCollection { get; set; }

        public int PromotionId { get; private set; }

        public string Name
        {
            get { return _name; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new PromotionNameNotValidException();
                }
                _name = value;
            }
        }

        public string UrlName
        {
            get { return _urlName; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new PromotionUrlNameNotValidException();
                }
                _urlName = value;
            }
        }

        public string Description
        {
            get { return _description; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new PromotionNameNotValidException();
                }
                _description = value;
            }
        }

        public DateTime UntilDate
        {
            get { return _untilDate; }
            set
            {
                if (value < DateTime.Now)
                {
                    throw new PromotionUntilDateNotValidException();
                }
                _untilDate = value;
            }
        }

        public IReadOnlyCollection<IImage> ImageCollection
        {
            get { return _imageCollection; }
        }

        public string Title { get; set; }

        public string MetaDescription { get; set; }

        public string MetaKeywords { get; set; }

        internal Promotion(PromotionDataModel dataModel,
            IPromotionDataManager promotionDataManager,
            IImageDataManager imageDataManager)
        {
            _imageDataManager = imageDataManager;
            _promotionDataManager = promotionDataManager;

            PromotionId = dataModel.PromotionId;
            _name = dataModel.Name;
            _urlName = dataModel.UrlName;
            _description = dataModel.Description;
            _untilDate = dataModel.UntilDate;
            Title = dataModel.Title;
            MetaDescription = dataModel.MetaDescription;
            MetaKeywords = dataModel.MetaKeywords;
            _imageCollection = dataModel.PromotionImages?
                .Select(i => new ImageModel(i.Image, imageDataManager))
                .ToList()
                ?? new List<ImageModel>();
        }

        internal Promotion(
            IPromotionDataManager promotionDataManager,
            IImageDataManager imageDataManager,
            string name,
            string urlName,
            string description,
            DateTime untilDate
            )
        {
            _imageDataManager = imageDataManager;
            _promotionDataManager = promotionDataManager;
            _isNew = true;

            Name = name;
            UrlName = urlName;
            Description = description;
            UntilDate = untilDate;
            _imageCollection = new List<ImageModel>();
        }

        public void Save()
        {
            var promotionDataModel = GetPromotionDataModel();

            var isPromotionUnique = _promotionDataManager.CheckPromotionUnique(promotionDataModel);

            if (!isPromotionUnique)
            {
                throw new PromotionNotUniqueException();
            }

            if (_isNew)
            {
                var result = _promotionDataManager.CreatePromotion(promotionDataModel);
                PromotionId = result.PromotionId;
            }
            else
            {
                _promotionDataManager.UpdatePromotion(promotionDataModel);
            }
        }

        public void Delete()
        {
            var promotionDataModel = GetPromotionDataModel();

            if (!_isNew)
            {
                _promotionDataManager.DeletePromotion(promotionDataModel);
            }
        }

        public void AddImage(byte[] imageData, string mimeType)
        {
            var newImage = new ImageModel(_imageDataManager, imageData, mimeType);
            _imageCollection.Add(newImage);
        }

        public void DeleteImage(IImage image)
        {
            var imageForRemove = _imageCollection.FirstOrDefault(im => im.ImageId == image.ImageId);
            if (imageForRemove != null)
            {
                _imageCollection.Remove(imageForRemove);
            }
        }

        private PromotionDataModel GetPromotionDataModel()
        {
            var promotionDataModel = new PromotionDataModel
            {
                PromotionId = PromotionId,
                Name = Name,
                UrlName = UrlName,
                Description = Description,
                UntilDate = UntilDate,
                Title = Title,
                MetaDescription = MetaDescription,
                MetaKeywords = MetaKeywords
            };

            promotionDataModel.PromotionImages = _imageCollection
                .Select(im => new PromotionImage
                {
                    Image = im.GetImageDataModel(),
                    ImageId = im.GetImageDataModel().ImageId,
                    Promotion = promotionDataModel,
                    PromotionId = promotionDataModel.PromotionId
                })
                .ToList();

            return promotionDataModel;
        }
    }
}
