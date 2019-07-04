using System;

namespace Travelx.Domain.Interfaces.Image.Models
{
    public interface IImage
    {
        int ImageId { get; set; }
        Byte[] ImageData { get; set; }
        string MimeType { get; set; }
    }
}
