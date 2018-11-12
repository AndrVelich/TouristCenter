using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Tour.Managers;
using TourDataModel = TouristCenter.Storage.Interfaces.Tour.Models.Tour;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;

namespace TouristCenter.Storage.Tour.Managers
{
    public sealed class TourDataManager : ITourDataManager
    {
        private readonly TouristCenterContext _dbContext;

        public TourDataManager(string connectionString)
        {
            _dbContext = new TouristCenterContext();
        }

        public TourDataModel GetTour(int tourId)
        {
            var tour = _dbContext.Tours
                .Include(t => t.Country)
                .AsNoTracking()
                .FirstOrDefault(c => c.TourId == tourId);
            return tour;
        }

        public TourDataModel GetTour(string tourType, string countryUrl, string tourUrl)
        {
            var tour = _dbContext.Tours
                .Include(t => t.Country)
                .AsNoTracking()
                .FirstOrDefault(c => c.Category == tourType && c.UrlName == tourUrl);
            return tour;
        }

        public IReadOnlyCollection<TourDataModel> GetTourCollection()
        {
            var tours = _dbContext.Tours
                .Include(t => t.Country)
                .AsNoTracking().ToList();
            return tours;
        }

        public IReadOnlyCollection<TourDataModel> GetTourCollection(string tourType, string countryUrl)
        {
            var tours = _dbContext.Tours
                .Include(t => t.Country)
                .AsNoTracking()
                .Where(t => t.Category == tourType && t.Country.UrlName == countryUrl)
                .ToList();
            return tours;
        }

        public IReadOnlyCollection<TourDataModel> GetTourCollection(string tourType)
        {
            var tours = _dbContext.Tours
                .Include(t => t.Country)
                .AsNoTracking()
                .Where(t => t.Category == tourType)
                .ToList();
            return tours;
        }

        public TourDataModel CreateTour(TourDataModel tourDataModel)
        {
            AttachCountry(tourDataModel);
            var result = _dbContext.Tours.Add(tourDataModel);
            _dbContext.SaveChanges();

            return result;
        }

        public void UpdateTour(TourDataModel tourDataModel)
        {
            var images = tourDataModel.Images;
            tourDataModel.Images = new HashSet<ImageDataModel>();
            tourDataModel.CountryId = tourDataModel.Country.CountryId;

            var entry = _dbContext.Entry(tourDataModel);
            entry.State = EntityState.Modified;
            entry.Collection(c => c.Images).Load();

            UpdateImages(tourDataModel, images);

            _dbContext.SaveChanges();
        }

        public void DeleteTour(TourDataModel tourDataModel)
        {
            var tour = _dbContext.Tours
                .Include(t => t.Images)
                .FirstOrDefault(t => t.TourId == tourDataModel.TourId);

            foreach (var image in tour.Images.ToList())
            {
                _dbContext.Images.Remove(image);
            }
            _dbContext.Tours.Remove(tour);

            _dbContext.SaveChanges();
        }

        public bool CheckTourUnique(TourDataModel tourDataModel)
        {
            AttachCountry(tourDataModel);
            var result = _dbContext.Tours.AsNoTracking().FirstOrDefault(c => c.TourId != tourDataModel.TourId
                                            && c.UrlName == tourDataModel.UrlName && c.Country.UrlName == tourDataModel.Country.UrlName) == null;
            return result;
        }

        private void UpdateImages(TourDataModel tourDataModel, ICollection<ImageDataModel> images)
        {
            var newImageCollection = images.Where(i => !tourDataModel.Images.Any(db => db.ImageId == i.ImageId)).ToList();

            foreach (var newImage in newImageCollection)
            {
                tourDataModel.Images.Add(newImage);
            }

            var imageForDeleteCollection = tourDataModel.Images.Where(db => !images.Any(i => i.ImageId == db.ImageId)).ToList();

            foreach (var imageForDelete in imageForDeleteCollection)
            {
                tourDataModel.Images.Remove(imageForDelete);
                _dbContext.Images.Remove(imageForDelete);
            }
        }

        private void AttachCountry(TourDataModel tourDataModel)
        {
            //TODO A.V check null
            var country = _dbContext.Countries.FirstOrDefault(c => c.UrlName == tourDataModel.Country.UrlName && c.Category == tourDataModel.Country.Category);
            tourDataModel.Country = country;
        }
    }
}
