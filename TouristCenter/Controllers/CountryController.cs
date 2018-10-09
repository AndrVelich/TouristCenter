using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TouristCenter.Domain.Interfaces.Country.Exceptions;
using TouristCenter.Domain.Interfaces.Country.Managers;
using TouristCenter.Domain.Interfaces.Country.Models;
using TouristCenter.Domain.Interfaces.Image.Managers;
using TouristCenter.Helpers.Converters;
using TouristCenter.Models.Country;

namespace TouristCenter.Controllers
{
    public class CountryController : ApiController
    {
        private readonly ICountryManager _countryManager;
        private readonly IImageManager _imageManager;

        public CountryController(ICountryManager countryManager,
            IImageManager imageManager)
        {
            _countryManager = countryManager;
            _imageManager = imageManager;
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

            var result = countries.Select(c => new CountryViewModel(c)).ToList();

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

            var imageForDeleteCollection = countryModel.ImageCollection.Where(im => !country.OldImageCollection.Contains(im.ImageId)).ToList();

            foreach (var newImage in country.NewImageCollection)
            {
                var mimeType = ImageConverter.GetImageMimeType(newImage);
                var imageData = ImageConverter.GetImageData(newImage);

                countryModel.AddImage(imageData, mimeType);
            }

            foreach (var newImage in imageForDeleteCollection)
            {
                countryModel.DeleteImage(newImage);
            }

            countryModel.Save();
        }

        
    }
}
