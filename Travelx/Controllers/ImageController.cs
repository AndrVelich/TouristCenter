using Microsoft.AspNetCore.Mvc;
using Travelx.Domain.Interfaces.Image.Managers;

namespace Travelx.Controllers
{
    public class ImageController : Controller
    {
        private readonly IImageManager _imageManager;

        public ImageController(IImageManager imageManager)
        {
            _imageManager = imageManager;
        }

        [Route("api/image/{id}")]
        public ActionResult Get(int id)
        {
            var image = _imageManager.GetImage(id);
            if (image == null)
            {
                return new EmptyResult();
            }

            return File(image.ImageData, image.MimeType);
        }
    }
}
