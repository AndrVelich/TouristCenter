using System.Linq;
using Travelx.Storage.Context;
using Travelx.Storage.Interfaces.Image.Managers;
using ImageDataModel = Travelx.Storage.Interfaces.Image.Models.Image;

namespace Travelx.Storage.Image.Managers
{
    public sealed class ImageDataManager : IImageDataManager
    {
        private readonly TravelxContext _dbContext;

        public ImageDataManager(TravelxContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ImageDataModel CreateImage(ImageDataModel imageDataModel)
        {
            var image = _dbContext.Images.Add(imageDataModel).Entity;
            _dbContext.SaveChanges();

            return image;
        }

        public ImageDataModel GetImage(int imageId)
        {
            var image = _dbContext.Images.FirstOrDefault(i => i.ImageId == imageId);
            return image;
        }

        public void DeleteImage(ImageDataModel imageDataModel)
        {
            _dbContext.Images.Remove(imageDataModel);
            _dbContext.SaveChanges();
        }
    }
}
