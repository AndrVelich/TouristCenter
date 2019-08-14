using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Travelx.Storage.Context;
using Travelx.Storage.Interfaces.Common.Page;
using Travelx.Storage.Interfaces.Country.Filter;
using Travelx.Storage.Interfaces.Country.Managers;
using Travelx.Storage.Interfaces.Country.Models;
using CountryDataModel = Travelx.Storage.Interfaces.Country.Models.Country;

namespace Travelx.Storage.Country.Managers
{
    public sealed class CountryDataManager : ICountryDataManager
    {
        private readonly TravelxContext _dbContext;

        public CountryDataManager(TravelxContext dbContext)
        {
            _dbContext = dbContext;
        }

        public CountryDataModel GetCountry(int countryId)
        {
            var country = _dbContext.Countries
                .Include(c => c.CountryImages)
                .AsNoTracking()
                .FirstOrDefault(c => c.CountryId == countryId);
            return country;
        }

        public CountryDataModel GetCountry(string tourType, string countryUrl)
        {
            var country = _dbContext.Countries
                .Include(c => c.CountryImages)
                .AsNoTracking()
                .FirstOrDefault(c => c.Category == tourType && c.UrlName == countryUrl);
            return country;
        }

        public PageDataModel<CountryDataModel> GetCountriesPage(CountryDataFilter filter)
        {
            var filteredCountries = _dbContext.Countries
                .Include(t => t.CountryImages)
                .OrderBy(t => t.Category)
                .ThenBy(t => t.Name)
                .Where(t => string.IsNullOrWhiteSpace(filter.TourType) || t.Category == filter.TourType);

            var count = filteredCountries.Count();
            var pageCollection = filteredCountries
                .Skip(filter.Skip)
                .Take(filter.Take)
                .AsNoTracking()
                .ToList();

            var result = new PageDataModel<CountryDataModel>(count, pageCollection);

            return result;
        }

        public CountryDataModel CreateCountry(CountryDataModel countryDataModel)
        {
            var result = _dbContext.Countries.Add(countryDataModel).Entity;
            _dbContext.SaveChanges();

            return result;
        }

        public void UpdateCountry(CountryDataModel countryDataModel)
        {
            var countryImages = countryDataModel.CountryImages;
            countryDataModel.CountryImages = new HashSet<CountryImage>();

            var entry = _dbContext.Attach(countryDataModel);
            entry.State = EntityState.Modified;
            entry.Collection(c => c.CountryImages).Load();

            UpdateImages(countryDataModel, countryImages);

            _dbContext.SaveChanges();
        }

        public void DeleteCountry(CountryDataModel countryDataModel)
        {
            var country = _dbContext.Countries
                .Include(c => c.CountryImages)
                .Include(c => c.Tours)
                .FirstOrDefault(c => c.CountryId == countryDataModel.CountryId);

            if (country != null)
            {
                RemoveCountryTours(country);
                RemoveCountryImages(country);
                _dbContext.Countries.Remove(country);

                _dbContext.SaveChanges();
            }

        }

        public bool CheckCountryUnique(CountryDataModel countryDataModel)
        {
            var result = _dbContext.Countries.AsNoTracking().FirstOrDefault(c => c.CountryId != countryDataModel.CountryId
                                            && c.UrlName == countryDataModel.UrlName) == null;
            return result;
        }

        #region [Remove]

        private void RemoveCountryTours(CountryDataModel country)
        {
            var tours = country.Tours?.ToList();
            if (tours != null && tours.Any())
            {
                foreach (var tour in tours)
                {
                    _dbContext.Tours.Remove(tour);
                }
            }
        }

        private void RemoveCountryImages(CountryDataModel country)
        {
            var countryImages = country.CountryImages?.ToList();
            if (countryImages != null && countryImages.Any())
            {
                foreach (var countryImage in country.CountryImages.ToList())
                {
                    var image = countryImage.Image;
                    if (image != null)
                    {
                        _dbContext.Images.Remove(image);
                    }
                }
            }
        }

        #endregion

        #region [Update]

        private void UpdateImages(CountryDataModel countryDataModel, ICollection<CountryImage> countryImages)
        {
            AddImages(countryDataModel, countryImages);
            DeleteImages(countryDataModel, countryImages);
        }

        private void AddImages(CountryDataModel countryDataModel, ICollection<CountryImage> countryImages)
        {
            var newImageCollection = countryImages
                .Where(i => countryDataModel.CountryImages
                    .All(db => db.ImageId != i.ImageId))
                .ToList();

            foreach (var newImage in newImageCollection)
            {
                countryDataModel.CountryImages.Add(newImage);
            }
        }

        private void DeleteImages(CountryDataModel countryDataModel, ICollection<CountryImage> countryImages)
        {
            var countryImageForDeleteCollection = countryDataModel.CountryImages.Where(db => countryImages.All(i => i.ImageId != db.ImageId)).ToList();

            foreach (var countryImageForDelete in countryImageForDeleteCollection)
            {
                countryDataModel.CountryImages.Remove(countryImageForDelete);
                var image = _dbContext.Images.FirstOrDefault(i => i.ImageId == countryImageForDelete.ImageId);
                if (image != null)
                {
                    _dbContext.Images.Remove(image);
                }

            }
        }

        #endregion
    }
}
