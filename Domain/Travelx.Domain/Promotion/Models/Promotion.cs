using System;
using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Interfaces.Promotion.Exceptions;
using Travelx.Domain.Interfaces.Promotion.Models;
using Travelx.Storage.Interfaces.Promotion.Managers;
using Travelx.Storage.Interfaces.Promotion.Models;
using PromotionDataModel = Travelx.Storage.Interfaces.Promotion.Models.Promotion;

namespace Travelx.Domain.Promotion.Models
{
    internal sealed class Promotion : IPromotion
    {
        private readonly IPromotionDataManager _promotionDataManager;
        private readonly List<int> _imageIdCollection;

        private readonly bool _isNew;

        private string _name;
        private string _urlName;
        private string _description;
        private DateTime _untilDate;

        public int PromotionId { get; private set; }

        public string Name
        {
            get => _name;
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
            get => _urlName;
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
            get => _description;
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
            get => _untilDate;
            set
            {
                if (value < DateTime.Now)
                {
                    throw new PromotionUntilDateNotValidException();
                }
                _untilDate = value;
            }
        }

        public IReadOnlyCollection<int> ImageIdCollection => _imageIdCollection;

        public string Title { get; set; }

        public bool IsActive { get; set; }

        public string MetaDescription { get; set; }

        public string MetaKeywords { get; set; }

        internal Promotion(PromotionDataModel dataModel,
            IPromotionDataManager promotionDataManager)
        {
            _promotionDataManager = promotionDataManager;

            PromotionId = dataModel.PromotionId;
            _name = dataModel.Name;
            _urlName = dataModel.UrlName;
            _description = dataModel.Description;
            _untilDate = dataModel.UntilDate;
            Title = dataModel.Title;
            IsActive = dataModel.IsActive;
            MetaDescription = dataModel.MetaDescription;
            MetaKeywords = dataModel.MetaKeywords;
            _imageIdCollection = dataModel.PromotionImages?.Select(ci => ci.ImageId).ToList() ??
                                 new List<int>();
        }

        internal Promotion(
            IPromotionDataManager promotionDataManager,
            string name,
            string urlName,
            string description,
            DateTime untilDate,
            bool isActive
            )
        {
            _promotionDataManager = promotionDataManager;
            _isNew = true;

            Name = name;
            UrlName = urlName;
            Description = description;
            UntilDate = untilDate;
            IsActive = isActive;
            _imageIdCollection = new List<int>();
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

        public void AddImage(int imageId)
        {
            _imageIdCollection.Add(imageId);
        }

        public void DeleteImage(int imageId)
        {
            _imageIdCollection.Remove(imageId);
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
                IsActive = IsActive,
                MetaDescription = MetaDescription,
                MetaKeywords = MetaKeywords
            };

            promotionDataModel.PromotionImages = _imageIdCollection
                .Select(imageId => new PromotionImage
                {
                    ImageId = imageId,
                    PromotionId = promotionDataModel.PromotionId
                })
                .ToList();

            return promotionDataModel;
        }
    }
}
