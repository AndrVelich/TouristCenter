using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Image.Managers;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;

namespace TouristCenter.Storage.Image.Managers
{
    public sealed class ImageDataManager : IImageDataManager
    {
        private readonly TouristCenterContext _dbContext;

        public ImageDataManager(string connectionString)
        {
            _dbContext = new TouristCenterContext();
        }

        public ImageDataModel CreateImage(ImageDataModel imageDataModel)
        {
            var image = _dbContext.Images.Add(imageDataModel);
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
