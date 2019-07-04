using Travelx.Domain.Interfaces.Image.Models;

namespace Travelx.Domain.Interfaces.Image.Managers
{
    public interface IImageManager
    {
        IImage GetImage(int imageId);
        IImage CreateImage(string mimeType, byte[] imageData);
        void DeleteImage(int imageId);
    }
}
