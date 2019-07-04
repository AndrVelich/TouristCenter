using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Country.Exceptions;
using Travelx.Domain.Interfaces.Country.Managers;
using Travelx.Domain.Interfaces.Country.Models;
using Travelx.Domain.Interfaces.Image.Managers;
using Travelx.Domain.Interfaces.Image.Models;
using Travelx.Helpers.Converters;
using Travelx.Models.Country;
using Travelx.Settings;

namespace Travelx.Controllers
{
    public class CountryController : Controller
    {
        private readonly ICountryManager _countryManager;
        private readonly IImageManager _imageManager;
        private readonly TravelxSettings _settings;
        

        public CountryController(ICountryManager countryManager,
            IImageManager imageManager,
            IOptions<TravelxSettings> config)
        {
            _countryManager = countryManager;
            _imageManager = imageManager;
            _settings = config?.Value;
        }

        [HttpGet]
        [Route("api/country/{tourType}/{countryUrl}")]
        public CountryViewModel GetCountry(string tourType, string countryUrl)
        {
            var tourTypeDomain = TourTypesConverter.ConvertFromString(tourType);
            var country = _countryManager.GetCountry(tourTypeDomain, countryUrl);
            var countryViewModel = new CountryViewModel(country);

            return countryViewModel;
        }

        [HttpGet]
        [Route("api/countries/{tourType?}")]
        public List<CountryViewModel> GetCollection(string tourType = null)
        {
            IReadOnlyCollection<ICountry> countries;
            if (string.IsNullOrWhiteSpace(tourType))
            {
                countries = _countryManager.GetCountryCollection();
            }
            else
            {
                var domainTourType = TourTypesConverter.ConvertFromString(tourType);
                countries = _countryManager.GetCountryCollection(domainTourType);
            }

            var result = countries.Select(c => new CountryViewModel(c))
                .OrderBy(c => c.Category)
                .ThenBy(c => c.Name)
                .ToList();

            return result;
        }

        [HttpGet, Route("api/hotCountries")]
        public List<CountryViewModel> GetHotCollection()
        {
            var domainTourType = TourTypesEnum.Beach;
            var countries = _countryManager.GetCountryCollection(domainTourType);
            var discount = _settings.HotToursDiscount;
            foreach (var country in countries)
            {
                country.FiveStarsPrice = (int)(country.FiveStarsPrice * discount);
                country.FourStarsPrice = (int)(country.FourStarsPrice * discount);
                country.ThreeStarsPrice = (int)(country.ThreeStarsPrice * discount);
            }

            var result = countries.Select(c => new CountryViewModel(c))
            .OrderBy(c => c.Name)
            .ToList();

            return result;
        }

        [HttpGet]
        [Route("api/earlyCountries")]
        public List<CountryViewModel> GetEarlyCollection()
        {
            var domainTourType = TourTypesEnum.Beach;
            var countries = _countryManager.GetCountryCollection(domainTourType);
            var discount = _settings.EarlyToursDiscount;
            foreach (var country in countries)
            {
                country.FiveStarsPrice = (int)(country.FiveStarsPrice * discount);
                country.FourStarsPrice = (int)(country.FourStarsPrice * discount);
                country.ThreeStarsPrice = (int)(country.ThreeStarsPrice * discount);
            }

            var result = countries.Select(c => new CountryViewModel(c))
                .OrderBy(c => c.Name)
                .ToList();

            return result;
        }

        [Authorize]
        public void Post(CountryViewModel country)
        {
            ICountry countryModel;
            try
            {
                countryModel = _countryManager.GetCountry(country.CountryId);
                countryModel.Name = country.Name;
                countryModel.UrlName = country.UrlName;
                countryModel.Category = TourTypesConverter.ConvertFromString(country.Category);
                countryModel.ThreeStarsPrice = country.ThreeStarsPrice;
                countryModel.FourStarsPrice = country.FourStarsPrice;
                countryModel.FiveStarsPrice = country.FiveStarsPrice;
                countryModel.Description = country.Description;
                countryModel.PageContent = country.PageContent;

            }
            catch (CountryNotFoundException)
            {
                countryModel = _countryManager.CreateCountry(
                        country.Name,
                        country.UrlName,
                        TourTypesConverter.ConvertFromString(country.Category),
                        country.ThreeStarsPrice,
                        country.FourStarsPrice,
                        country.FiveStarsPrice,
                        country.Description,
                        country.PageContent
                    );
            }

            countryModel.PageContentBottom = country.PageContentBottom;
            countryModel.Title = country.Title;
            countryModel.MetaDescription = country.MetaDescription;
            countryModel.MetaKeywords = country.MetaKeywords;
            countryModel.PageHeader = country.PageHeader;

            var imageForDeleteCollection = countryModel.ImageIdCollection.Where(imageId => !country.OldImageCollection.Contains(imageId)).ToList();

            foreach (var newImage in country.NewImageCollection)
            {
                var image = CreateImage(newImage);
                countryModel.AddImage(image.ImageId);
            }

            foreach (var imageId in imageForDeleteCollection)
            {
                countryModel.DeleteImage(imageId);
            }

            countryModel.Save();
        }

        [Authorize]
        [HttpDelete]
        [Route("api/country/{id}")]
        public void Delete(int id)
        {
            var country = _countryManager.GetCountry(id);
            country.Delete();
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
