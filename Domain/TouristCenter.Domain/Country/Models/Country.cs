using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Common.Converters;
using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Country.Exceptions;
using TouristCenter.Domain.Interfaces.Country.Models;
using TouristCenter.Domain.Interfaces.Image.Models;
using TouristCenter.Storage.Interfaces.Country.Managers;
using TouristCenter.Storage.Interfaces.Image.Managers;
using CountryDataModel = TouristCenter.Storage.Interfaces.Country.Models.Country;
using ImageModel = TouristCenter.Domain.Image.Models.Image;

namespace TouristCenter.Domain.Country.Models
{
    internal sealed class Country : ICountry
    {
        private readonly ICountryDataManager _countryDataManager;
        private readonly IImageDataManager _imageDataManager;

        private bool _isNew;

        private string _name;
        private string _urlName;
        private decimal _threeStarsPrice;
        private decimal _fourStarsPrice;
        private decimal _fiveStarsPrice;
        private string _description;
        private string _pageContent;
        private List<ImageModel> _imageCollection { get; set; }

        public int CountryId { get; private set; }

        public string Name
        {
            get { return _name; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new CountryNameNotValidException();
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
                    throw new CountryUrlNameNotValidException();
                }
                _urlName = value;
            }
        }

        public TourTypesEnum Category { get; set; }

        public decimal ThreeStarsPrice
        {
            get { return _threeStarsPrice; }
            set
            {
                if (value < 0)
                {
                    throw new CountryPriceNotValidException();
                }
                _threeStarsPrice = value;
            }
        }

        public decimal FourStarsPrice
        {
            get { return _fourStarsPrice; }
            set
            {
                if (value < 0)
                {
                    throw new CountryPriceNotValidException();
                }
                _fourStarsPrice = value;
            }
        }

        public decimal FiveStarsPrice
        {
            get { return _fiveStarsPrice; }
            set
            {
                if (value < 0)
                {
                    throw new CountryPriceNotValidException();
                }
                _fiveStarsPrice = value;
            }
        }

        public string Description
        {
            get { return _description; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new CountryNameNotValidException();
                }
                _description = value;
            }
        }

        public string PageContent
        {
            get { return _pageContent; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new CountryNameNotValidException();
                }
                _pageContent = value;
            }
        }

        public string PageContentBottom { get; set; }

        public string Title { get; set; }

        public string MetaDescription { get; set; }

        public string MetaKeywords { get; set; }

        public string PageHeader { get; set; }

        public IReadOnlyCollection<IImage> ImageCollection
        {
            get { return _imageCollection; }
        }

        internal Country(CountryDataModel dataModel, 
            ICountryDataManager countryDataManager, 
            IImageDataManager imageDataManager)
        {
            _imageDataManager = imageDataManager;
            _countryDataManager = countryDataManager;

            CountryId = dataModel.CountryId;
            _name = dataModel.Name;
            _urlName = dataModel.UrlName;
            Category = TourTypesEnumConverter.ConvertToDomainValue(dataModel.Category);
            _threeStarsPrice = dataModel.ThreeStarsPrice;
            _fourStarsPrice = dataModel.FourStarsPrice;
            _fiveStarsPrice = dataModel.FiveStarsPrice;
            _description = dataModel.Description;
            _pageContent = dataModel.PageContent;
            PageContentBottom = dataModel.PageContentBottom;
            Title = dataModel.Title;
            MetaDescription = dataModel.MetaDescription;
            MetaKeywords = dataModel.MetaKeywords;
            PageHeader = dataModel.PageHeader;
            _imageCollection = dataModel.Images != null ? 
                dataModel.Images.Select(i => new ImageModel(i, imageDataManager)).ToList() : 
                new List<ImageModel>();
        }

        internal Country(
            ICountryDataManager countryDataManager,
            IImageDataManager imageDataManager,
            string name,
            string urlName,
            TourTypesEnum category,
            decimal threeStarsPrice,
            decimal fourStarsPrice,
            decimal fiveStarsPrice,
            string description,
            string pageContent
            )
        {
            _imageDataManager = imageDataManager;
            _countryDataManager = countryDataManager;
            _isNew = true;

            Name = name;
            UrlName = urlName;
            Category = category;
            ThreeStarsPrice = threeStarsPrice;
            FourStarsPrice = fourStarsPrice;
            FiveStarsPrice = fiveStarsPrice;
            Description = description;
            PageContent = pageContent;
            _imageCollection = new List<ImageModel>();
        }

        public void Save()
        {
            var countryDataModel = GetCountryDataModel();

            var isCountryUnique = _countryDataManager.CheckCountryUnique(countryDataModel);

            if (!isCountryUnique)
            {
                throw new CountryNotUniqueException();
            }

            if (_isNew)
            {
                var result = _countryDataManager.CreateCountry(countryDataModel);
                CountryId = result.CountryId;
            }
            else
            {
                _countryDataManager.UpdateCountry(countryDataModel);
            }
        }

        public void Delete()
        {
            var countryDataModel = GetCountryDataModel();

            if (!_isNew)
            {
                _countryDataManager.DeleteCountry(countryDataModel);
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
            if(imageForRemove != null)
            {
                _imageCollection.Remove(imageForRemove);
            }
        }

        private CountryDataModel GetCountryDataModel()
        {
            var countryDataModel = new CountryDataModel
            {
                CountryId = CountryId,
                Name = Name,
                UrlName = UrlName,
                Category = TourTypesEnumConverter.ConvertToDbValue(Category),
                ThreeStarsPrice = ThreeStarsPrice,
                FourStarsPrice = FourStarsPrice,
                FiveStarsPrice = FiveStarsPrice,
                Description = Description,
                PageContent = PageContent,
                PageContentBottom = PageContentBottom,
                Title = Title,
                MetaDescription = MetaDescription,
                MetaKeywords = MetaKeywords,
                PageHeader = PageHeader,
                Images = _imageCollection.Select(im => im.GetImageDataModel()).ToList()
            };

            return countryDataModel;
        }
    }
}
