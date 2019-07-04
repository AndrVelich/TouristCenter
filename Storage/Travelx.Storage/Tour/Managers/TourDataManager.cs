using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Travelx.Storage.Context;
using Travelx.Storage.Interfaces.Tour.Managers;
using Travelx.Storage.Interfaces.Tour.Models;
using TourDataModel = Travelx.Storage.Interfaces.Tour.Models.Tour;

namespace Travelx.Storage.Tour.Managers
{
    public sealed class TourDataManager : ITourDataManager
    {
        private readonly TravelxContext _dbContext;

        public TourDataManager(string connectionString)
        {
            _dbContext = new TravelxContext(connectionString);
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
            var result = _dbContext.Tours.Add(tourDataModel).Entity;
            _dbContext.SaveChanges();

            return result;
        }

        public void UpdateTour(TourDataModel tourDataModel)
        {
            var tourImages = tourDataModel.TourImages;
            tourDataModel.TourImages = new HashSet<TourImage>();
            tourDataModel.CountryId = tourDataModel.Country.CountryId;

            var entry = _dbContext.Entry(tourDataModel);
            entry.State = EntityState.Modified;
            entry.Collection(c => c.TourImages).Load();

            UpdateImages(tourDataModel, tourImages);

            _dbContext.SaveChanges();
        }

        public void DeleteTour(TourDataModel tourDataModel)
        {
            var tour = _dbContext.Tours
                .Include(t => t.TourImages)
                .FirstOrDefault(t => t.TourId == tourDataModel.TourId);

            if (tour != null)
            {
                RemoveTourImages(tour);
                _dbContext.Tours.Remove(tour);

                _dbContext.SaveChanges();
            }
        }

        public bool CheckTourUnique(TourDataModel tourDataModel)
        {
            AttachCountry(tourDataModel);
            var result = _dbContext.Tours.AsNoTracking().FirstOrDefault(c => c.TourId != tourDataModel.TourId
                                            && c.UrlName == tourDataModel.UrlName && c.Country.UrlName == tourDataModel.Country.UrlName) == null;
            return result;
        }

        #region [Remove]

        private void RemoveTourImages(TourDataModel tourDataModel)
        {
            var tourImageCollection = tourDataModel.TourImages?.ToList();
            if (tourImageCollection != null && tourImageCollection.Any())
            {
                foreach (var tourImage in tourImageCollection)
                {
                    var image = tourImage.Image;
                    if (image != null)
                    {
                        _dbContext.Images.Remove(image);
                    }

                }
            }
        }

        #endregion

        private void UpdateImages(TourDataModel tourDataModel, ICollection<TourImage> tourImages)
        {
            var newImageCollection = tourImages
                .Where(i => tourDataModel.TourImages
                .All(db => db.ImageId != i.ImageId && db.Image != null))
                .Select(ti => ti.Image)
                .ToList();

            foreach (var newImage in newImageCollection)
            {
                _dbContext.Images.Add(newImage);
                var newTourImag = new TourImage
                {
                    TourId = tourDataModel.CountryId,
                    Image = newImage
                };
                tourDataModel.TourImages.Add(newTourImag);
            }

            var tourImageForDeleteCollection = tourDataModel.TourImages.Where(db => tourImages.All(i => i.ImageId != db.ImageId)).ToList();

            foreach (var tourImageForDelete in tourImageForDeleteCollection)
            {
                tourDataModel.TourImages.Remove(tourImageForDelete);
                _dbContext.Images.Remove(tourImageForDelete.Image);
            }
        }

        private void AttachCountry(TourDataModel tourDataModel)
        {
            //TODO A.V check null
            var country = _dbContext.Countries
                .FirstOrDefault(c => c.UrlName == tourDataModel.Country.UrlName && c.Category == tourDataModel.Country.Category);
            tourDataModel.Country = country;
        }
    }
}
