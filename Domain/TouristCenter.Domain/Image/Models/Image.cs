using System;
using TouristCenter.Domain.Interfaces.Image.Models;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;

namespace TouristCenter.Domain.Image.Models
{
    internal sealed class Image : IImage
    {
        public int ImageId { get; set; }
        public Byte[] ImageData { get; set; }
        public string MimeType { get; set; }

        internal Image(ImageDataModel data)
        {
            ImageId = data.ImageId;
            ImageData = data.ImageData;
            MimeType = data.MimeType;
        }
    }
}
