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

            var imageForDeleteCollection = countryModel.ImageIdCollection.Except(country.OldImageCollection);

            //parce bace 64

            //save new images

            //save countries

            //delete old images
        }
    }
}
