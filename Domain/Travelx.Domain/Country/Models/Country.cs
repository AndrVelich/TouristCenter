using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Common.Converters;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Country.Exceptions;
using Travelx.Domain.Interfaces.Country.Models;
using Travelx.Storage.Interfaces.Country.Managers;
using Travelx.Storage.Interfaces.Country.Models;
using CountryDataModel = Travelx.Storage.Interfaces.Country.Models.Country;

namespace Travelx.Domain.Country.Models
{
    internal sealed class Country : ICountry
    {
        private readonly ICountryDataManager _countryDataManager;
        private readonly List<int> _imageIdCollection;
        private readonly bool _isNew;

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
            get => _name;
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
            get => _urlName;
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
            get => _threeStarsPrice;
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
            get => _fourStarsPrice;
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
            get => _fiveStarsPrice;
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
            get => _description;
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
            get => _pageContent;
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

        public IReadOnlyCollection<int> ImageIdCollection => _imageIdCollection;

        internal Country(CountryDataModel dataModel, 
            ICountryDataManager countryDataManager)
        {
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
            _imageIdCollection = dataModel.CountryImages?.Select(ci => ci.ImageId).ToList() ?? 
                new List<int>();
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
            _imageIdCollection = new List<int>();
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

        public void AddImage(int imageId)
        {
            _imageIdCollection.Add(imageId);
        }

        public void DeleteImage(int imageId)
        {
            _imageIdCollection.Remove(imageId);
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
                PageHeader = PageHeader
            };

            countryDataModel.CountryImages = _imageIdCollection
                .Select(imageId => new CountryImage
                {
                    ImageId = imageId,
                    CountryId = countryDataModel.CountryId
                })
                .ToList();

            return countryDataModel;
        }
    }
}
