using System;

namespace TouristCenter.Domain.Interfaces.Image.Models
{
    public interface IImage
    {
        int ImageId { get; set; }
        Byte[] ImageData { get; set; }
        string MimeType { get; set; }
    }
}
