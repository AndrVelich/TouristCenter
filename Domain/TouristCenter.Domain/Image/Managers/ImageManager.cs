using TouristCenter.Domain.Interfaces.Image.Exceptions;
using TouristCenter.Domain.Interfaces.Image.Managers;
using TouristCenter.Domain.Interfaces.Image.Models;
using TouristCenter.Storage.Interfaces.Image.Managers;
using ImageModel = TouristCenter.Domain.Image.Models.Image;

namespace TouristCenter.Domain.Image.Managers
{
    public sealed class ImageManager : IImageManager
    {
        private readonly IImageDataManager _imageDataManager;

        public ImageManager(IImageDataManager imageDataManager)
        {
            _imageDataManager = imageDataManager;
        }

        public IImage GetImage(int imageId)
        {
            var imageDataModel = _imageDataManager.GetImage(imageId);
            if(imageDataModel == null)
            {
                throw new ImageNotFoundException();
            }
            var image = new ImageModel(imageDataModel, _imageDataManager);

            return image;
        }

        public IImage CreateImage(string mimeType, byte[] imageData)
        {
            var image = new ImageModel(_imageDataManager, imageData, mimeType);

            return image;
        }

        public void DeleteImage(int imageId)
        {
            var imageData = _imageDataManager.GetImage(imageId);

            if(imageData != null)
            {
                _imageDataManager.DeleteImage(imageData);
            }
        }
    }
}
