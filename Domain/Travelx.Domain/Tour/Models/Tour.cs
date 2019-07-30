using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Common.Converters;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Tour.Exceptions;
using Travelx.Domain.Interfaces.Tour.Models;
using Travelx.Storage.Interfaces.Image.Managers;
using Travelx.Storage.Interfaces.Tour.Managers;
using Travelx.Storage.Interfaces.Tour.Models;
using CountryDataModel = Travelx.Storage.Interfaces.Country.Models.Country;
using TourDataModel = Travelx.Storage.Interfaces.Tour.Models.Tour;

namespace Travelx.Domain.Tour.Models
{
    internal sealed class Tour : ITour
    {
        private readonly ITourDataManager _tourDataManager;
        private readonly List<int> _imageIdCollection;

        private readonly bool _isNew;

        private string _name;
        private string _urlName;
        private string _city;
        private decimal _price;
        private int _stars;

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
            get => _city;
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
            get => _price;
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
            get => _stars;
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

        public IReadOnlyCollection<int> ImageIdCollection => _imageIdCollection;

        internal Tour(TourDataModel dataModel,
            ITourDataManager tourDataManager,
            IImageDataManager imageDataManager)
        {
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
            _imageIdCollection = dataModel.TourImages?.Select(ci => ci.ImageId).ToList() ??
                                 new List<int>();
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
            _imageIdCollection = new List<int>();
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

        public void AddImage(int imageId)
        {
            _imageIdCollection.Add(imageId);
        }

        public void DeleteImage(int imageId)
        {
            _imageIdCollection.Remove(imageId);
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

            tourDataModel.TourImages = _imageIdCollection
                .Select(imageId => new TourImage
                {
                    ImageId = imageId,
                    TourId = tourDataModel.CountryId
                })
                .ToList();

            return tourDataModel;
        }
    }
}
