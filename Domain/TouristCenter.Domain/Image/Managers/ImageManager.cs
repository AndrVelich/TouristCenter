using TouristCenter.Domain.Interfaces.Image.Exceptions;
using TouristCenter.Domain.Interfaces.Image.Managers;
using TouristCenter.Domain.Interfaces.Image.Models;
using TouristCenter.Storage.Interfaces.Image.Managers;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;
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
            var image = new ImageModel(imageDataModel);

            return image;
        }

        public IImage CreateImage(string mimeType, byte[] imageData)
        {
            //TODO A.V. need to replace logic to Model
            if (string.IsNullOrWhiteSpace(mimeType))
            {
                throw new ImageMimeTypeNotValidException();
            }
            if (imageData == null)
            {
                throw new ImageDataNotValidException();
            }

            var imageDataManager = new ImageDataModel
            {
                MimeType = mimeType,
                ImageData = imageData
            };

            var imageDataModel = _imageDataManager.CreateImage(imageDataManager);
            var image = new ImageModel(imageDataModel);

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
