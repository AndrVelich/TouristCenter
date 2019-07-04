using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Common.Converters;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Image.Models;
using Travelx.Domain.Interfaces.Tour.Exceptions;
using Travelx.Domain.Interfaces.Tour.Models;
using Travelx.Storage.Interfaces.Image.Managers;
using Travelx.Storage.Interfaces.Tour.Managers;
using Travelx.Storage.Interfaces.Tour.Models;
using CountryDataModel = Travelx.Storage.Interfaces.Country.Models.Country;
using TourDataModel = Travelx.Storage.Interfaces.Tour.Models.Tour;
using ImageModel = Travelx.Domain.Image.Models.Image;

namespace Travelx.Domain.Tour.Models
{
    internal sealed class Tour : ITour
    {
        private readonly ITourDataManager _tourDataManager;
        private readonly IImageDataManager _imageDataManager;

        private bool _isNew;

        private string _name;
        private string _urlName;
        private string _city;
        private decimal _price;
        private int _stars;
        private readonly List<ImageModel> _imageCollection;

        public int TourId { get; private set; }

        public string Name
        {
            get => _name;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new TourNameNotValidException();
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
                    throw new TourUrlNameNotValidException();
                }
                _urlName = value;
            }
        }

        public string City
        {
            get { return _city; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new TourCityNotValidException();
                }
                _city = value;
            }
        }

        public TourTypesEnum Category { get; set; }

        public decimal Price
        {
            get { return _price; }
            set
            {
                if (value < 0)
                {
                    throw new TourPriceNotValidException();
                }
                _price = value;
            }
        }

        public int Stars
        {
            get { return _stars; }
            set
            {
                if (value < 2 && value > 5)
                {
                    throw new StarsNotValidException();
                }
                _stars = value;
            }
        }

        public string Description { get; set; }

        //TODO A.V. need to refactor
        public string Country { get; set; }
        public int Nights { get; set; }
        public bool IsFlightIncluded { get; set; }

        public IReadOnlyCollection<IImage> ImageCollection => _imageCollection;

        internal Tour(TourDataModel dataModel,
            ITourDataManager tourDataManager,
            IImageDataManager imageDataManager)
        {
            _imageDataManager = imageDataManager;
            _tourDataManager = tourDataManager;

            TourId = dataModel.TourId;
            _name = dataModel.Name;
            _urlName = dataModel.UrlName;
            _city = dataModel.City;
            Category = TourTypesEnumConverter.ConvertToDomainValue(dataModel.Category);
            _price = dataModel.Price;
            _stars = dataModel.Stars;
            Description = dataModel.Description;
            Country = dataModel.Country.UrlName;
            Nights = dataModel.Nights;
            IsFlightIncluded = dataModel.IsFlightIncluded;
            _imageCollection = dataModel.TourImages?.Select(i => new ImageModel(i.Image, imageDataManager)).ToList() ?? new List<ImageModel>();
        }

        internal Tour(
            ITourDataManager tourDataManager,
            IImageDataManager imageDataManager,
            string name,
            string urlName,
            string city,
            TourTypesEnum category,
            decimal price,
            int stars,
            string description,
            string country,
            int nights,
            bool isFlightIncluded
            )
        {
            _imageDataManager = imageDataManager;
            _tourDataManager = tourDataManager;
            _isNew = true;

            Name = name;
            UrlName = urlName;
            City = city;
            Category = category;
            Price = price;
            Stars = stars;
            Description = description;
            Country = country;
            Nights = nights;
            IsFlightIncluded = isFlightIncluded;
            _imageCollection = new List<ImageModel>();
        }

        public void Save()
        {
            var tourDataModel = GetTourDataModel();

            var isTourUnique = _tourDataManager.CheckTourUnique(tourDataModel);

            if (!isTourUnique)
            {
                throw new TourNotUniqueException();
            }

            if (_isNew)
            {
                var result = _tourDataManager.CreateTour(tourDataModel);
                TourId = result.TourId;
            }
            else
            {
                _tourDataManager.UpdateTour(tourDataModel);
            }
        }

        public void Delete()
        {
            var tourDataModel = GetTourDataModel();

            if (!_isNew)
            {
                _tourDataManager.DeleteTour(tourDataModel);
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

        private TourDataModel GetTourDataModel()
        {
            var tourDataModel = new TourDataModel
            {
                TourId = TourId,
                Name = Name,
                UrlName = UrlName,
                City = City,
                Category = TourTypesEnumConverter.ConvertToDbValue(Category),
                Price = Price,
                Stars = Stars,
                Description = Description,
                Country = new CountryDataModel { UrlName = Country, Category = TourTypesEnumConverter.ConvertToDbValue(Category) },
                Nights = Nights,
                IsFlightIncluded = IsFlightIncluded,

            };

            tourDataModel.TourImages = _imageCollection
                .Select(im => new TourImage
                {
                    Image = im.GetImageDataModel(),
                    ImageId = im.GetImageDataModel().ImageId,
                    Tour = tourDataModel,
                    TourId = tourDataModel.TourId
                })
                .ToList();

            return tourDataModel;
        }
    }
}
