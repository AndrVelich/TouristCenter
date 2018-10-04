using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Data.Entity;
using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Country.Managers;
using CountryDataModel = TouristCenter.Storage.Interfaces.Country.Models.Country;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;
using System.Data.Entity.Infrastructure;

namespace TouristCenter.Storage.Country.Managers
{
    public sealed class CountryDataManager : ICountryDataManager
    {
        private readonly TouristCenterContext _dbContext;

        public CountryDataManager(string connectionString)
        {
            _dbContext = new TouristCenterContext();
        }

        public CountryDataModel GetCountry(int countryId)
        {
            var country = _dbContext.Countries
                .AsNoTracking()
                .FirstOrDefault(c => c.CountryId == countryId);
            return country;
        }

        public CountryDataModel GetCountry(string tourType, string countryUrl)
        {
            var country = _dbContext.Countries
                .AsNoTracking()
                .FirstOrDefault(c => c.Category == tourType && c.UrlName == countryUrl);
            return country;
        }

        public IReadOnlyCollection<CountryDataModel> GetCountryCollection()
        {
            var countries = _dbContext.Countries.AsNoTracking().ToList();
            return countries;
        }

        public IReadOnlyCollection<CountryDataModel> GetCountryCollection(string tourType)
        {
            var countries = _dbContext.Countries
                .AsNoTracking()
                .Where(c => c.Category == tourType)
                .ToList();
            return countries;
        }

        public CountryDataModel CreateCountry(CountryDataModel countryDataModel)
        {
            var result = _dbContext.Countries.Add(countryDataModel);
            _dbContext.SaveChanges();

            return result;
        }

        public void UpdateCountry(CountryDataModel countryDataModel)
        {
            var images = countryDataModel.Images;
            countryDataModel.Images = new HashSet<ImageDataModel>();

            var entry = _dbContext.Entry(countryDataModel);
            entry.State = EntityState.Modified;
            entry.Collection(c => c.Images).Load();

            UpdateImages(countryDataModel, images);

            _dbContext.SaveChanges();
        }

        public void DeleteCountry(CountryDataModel countryDataModel)
        {
            countryDataModel.Images = new HashSet<ImageDataModel>();
            var entry = _dbContext.Entry(countryDataModel);
            entry.Collection(c => c.Images).Load();

            _dbContext.Countries.Remove(countryDataModel);
            foreach (var image in countryDataModel.Images)
            {
                _dbContext.Images.Remove(image);
            }
           

            _dbContext.SaveChanges();
        }

        public bool CheckCountryUnique(CountryDataModel countryDataModel)
        {
            var result = _dbContext.Countries.AsNoTracking().FirstOrDefault(c => c.CountryId != countryDataModel.CountryId
                                            && c.UrlName == countryDataModel.UrlName) == null;
            return result;
        }

        private void UpdateImages(CountryDataModel countryDataModel, ICollection<ImageDataModel> images)
        {
            var newImageCollection = images.Where(i => !countryDataModel.Images.Any(db => db.ImageId == i.ImageId)).ToList();

            foreach (var newImage in newImageCollection)
            {
                countryDataModel.Images.Add(newImage);
            }

            var imageForDeleteCollection = countryDataModel.Images.Where(db => !images.Any(i => i.ImageId == db.ImageId)).ToList();

            foreach (var imageForDelete in imageForDeleteCollection)
            {
                countryDataModel.Images.Remove(imageForDelete);
                _dbContext.Images.Remove(imageForDelete);
            }
        }
    }
}
