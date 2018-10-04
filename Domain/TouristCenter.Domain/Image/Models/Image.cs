using System;
using TouristCenter.Domain.Interfaces.Image.Exceptions;
using TouristCenter.Domain.Interfaces.Image.Models;
using TouristCenter.Storage.Interfaces.Image.Managers;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;

namespace TouristCenter.Domain.Image.Models
{
    internal sealed class Image : IImage
    {
        private readonly IImageDataManager _imageDataManager;
        private bool _isNew;

        private byte[] _imageData;
        private string _mymeType;

        public int ImageId { get; set; }
        public Byte[] ImageData
        {
            get
            {
                return _imageData;
            }
            set
            {
                _imageData = value ?? throw new ImageDataNotValidException();
            }
        }
        public string MimeType
        {
            get
            {
                return _mymeType;
            }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ImageMimeTypeNotValidException();
                }
                _mymeType = value;
            }
        }

        internal Image(ImageDataModel data, IImageDataManager imageDataManager)
        {
            ImageId = data.ImageId;
            ImageData = data.ImageData;
            MimeType = data.MimeType;

            _imageDataManager = imageDataManager;
        }

        internal Image(IImageDataManager imageDataManager, byte[] imageData, string mimeType)
        {
            ImageData = imageData;
            MimeType = mimeType;

            _isNew = true;
            _imageDataManager = imageDataManager;
        }

        internal void Create()
        {
            if (_isNew)
            {
                var imageDataModel = GetImageDataModel();
                var result = _imageDataManager.CreateImage(imageDataModel);
                ImageId = result.ImageId;
                _isNew = false;
            }
        }

        internal void Delete()
        {
            if (!_isNew)
            {
                var imageDataModel = GetImageDataModel();
                _imageDataManager.DeleteImage(imageDataModel);
            }
        }

        internal ImageDataModel GetImageDataModel()
        {
            var result = new ImageDataModel
            {
                ImageId = ImageId,
                ImageData = ImageData,
                MimeType = MimeType
            };

            return result;
        }
    }
}
