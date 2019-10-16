using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Common.Page;
using Travelx.Domain.Interfaces.Country.Exceptions;
using Travelx.Domain.Interfaces.Country.Filter;
using Travelx.Domain.Interfaces.Country.Managers;
using Travelx.Domain.Interfaces.Country.Models;
using Travelx.Domain.Interfaces.Image.Managers;
using Travelx.Domain.Interfaces.Image.Models;
using Travelx.Helpers.Converters;
using Travelx.Models.Common.Page;
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
        [Route("api/countries")]
        public PageViewModel<CountryShortViewModel> GetCollection(string tourType, int skip = 0, int take = int.MaxValue)
        {
            var countryFilter = new CountryFilter(skip, take)
            {
                TourType = string.IsNullOrWhiteSpace(tourType) ? (TourTypesEnum?)null : TourTypesConverter.ConvertFromString(tourType)
            };
            var countriesPage = _countryManager.GetCountriesPage(countryFilter);
            var result = GetCountriesPageViewModel(countriesPage);

            return result;
        }

        [HttpGet, Route("api/hotCountries")]
        public PageViewModel<CountryShortViewModel> GetHotCollection(int skip = 0, int take = int.MaxValue)
        {
            var result = GetBeachToursPage(skip, take);
            var discount = _settings.HotToursDiscount;
            SetDiscount(result.Collection, discount);

            return result;
        }

        [HttpGet]
        [Route("api/earlyCountries")]
        public PageViewModel<CountryShortViewModel> GetEarlyCollection(int skip = 0, int take = int.MaxValue)
        {
            var result = GetBeachToursPage(skip, take);
            var discount = _settings.EarlyToursDiscount;
            SetDiscount(result.Collection, discount);

            return result;
        }

        [Authorize]
        [Route("api/country")]
        public void Post([FromBody]CountryViewModel country)
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

        private PageViewModel<CountryShortViewModel> GetCountriesPageViewModel(PageModel<ICountry> pageModel)
        {
            var countriesPageCollection = pageModel.Collection.Select(c => new CountryShortViewModel(c))
                .ToList();
            var result = new PageViewModel<CountryShortViewModel>(pageModel.Count, countriesPageCollection);

            return result;
        }

        private void SetDiscount(IReadOnlyCollection<CountryShortViewModel> countryCollection, decimal discount)
        {
            foreach (var country in countryCollection)
            {
                country.FiveStarsPrice = (int)(country.FiveStarsPrice * discount);
                country.FourStarsPrice = (int)(country.FourStarsPrice * discount);
                country.ThreeStarsPrice = (int)(country.ThreeStarsPrice * discount);
            }
        }
        
        private PageViewModel<CountryShortViewModel> GetBeachToursPage(int skip = 0, int take = int.MaxValue)
        {
            var countryFilter = new CountryFilter(skip, take)
            {
                TourType = TourTypesEnum.Beach
            };
            var countriesPage = _countryManager.GetCountriesPage(countryFilter);
            var result = GetCountriesPageViewModel(countriesPage);

            return result;
        }
    }
}
