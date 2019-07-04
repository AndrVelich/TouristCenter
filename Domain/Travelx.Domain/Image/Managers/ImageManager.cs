using Travelx.Domain.Interfaces.Image.Exceptions;
using Travelx.Domain.Interfaces.Image.Managers;
using Travelx.Domain.Interfaces.Image.Models;
using Travelx.Storage.Interfaces.Image.Managers;
using ImageModel = Travelx.Domain.Image.Models.Image;

namespace Travelx.Domain.Image.Managers
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
            image.Create();
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
