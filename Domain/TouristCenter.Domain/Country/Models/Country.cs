using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Common.Converters;
using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Country.Exceptions;
using TouristCenter.Domain.Interfaces.Country.Models;
using TouristCenter.Storage.Interfaces.Country.Managers;
using CountryDataModel = TouristCenter.Storage.Interfaces.Country.Models.Country;

namespace TouristCenter.Domain.Country.Models
{
    internal sealed class Country : ICountry
    {
        private readonly ICountryDataManager _countryDataManager;

        private bool _isNew;

        private string _name;
        private string _urlName;
        private decimal _threeStarsPrice;
        private decimal _fourStarsPrice;
        private decimal _fiveStarsPrice;
        private string _description;
        private string _pageContent;

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

        public IReadOnlyCollection<int> ImageIdCollection { get; set; }

        internal Country(CountryDataModel dataModel, ICountryDataManager countryDataManager)
        {
            _name = dataModel.Name;
            _urlName = dataModel.UrlName;
            Category = TourTypesEnumConverter.ConvertToDomainValue(dataModel.Category);
            _threeStarsPrice = dataModel.ThreeStarsPrice;
            _fourStarsPrice = dataModel.FourStarsPrice;
            _fiveStarsPrice = dataModel.FiveStarsPrice;
            _description = dataModel.Description;
            _pageContent = dataModel.PageContent;
            ImageIdCollection = dataModel.Images != null ? dataModel.Images.Select(i => i.ImageId).ToList() : new List<int>();
            _countryDataManager = countryDataManager;
        }

        internal Country(
            ICountryDataManager countryDataManager,
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
            Name = name;
            UrlName = urlName;
            Category = category;
            ThreeStarsPrice = threeStarsPrice;
            FourStarsPrice = fourStarsPrice;
            FiveStarsPrice = fiveStarsPrice;
            Description = description;
            PageContent = pageContent;
            _countryDataManager = countryDataManager;
        }

        public void Save()
        {
            var countryDataModel = GetCountryDataModel();

            if (_isNew)
            {
                _countryDataManager.CreateCountry(countryDataModel);
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
                PageContent = PageContent
            };

            return countryDataModel;
        }
    }
}
