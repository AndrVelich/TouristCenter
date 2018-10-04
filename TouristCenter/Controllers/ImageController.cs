using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using TouristCenter.Domain.Interfaces.Image.Managers;

namespace TouristCenter.Controllers
{
    public class ImageController : ApiController
    {
        private readonly IImageManager _imageManager;

        public ImageController(IImageManager imageManager)
        {
            _imageManager = imageManager;
        }

        public HttpResponseMessage Get(int id)
        {
            var image = _imageManager.GetImage(id);
            var result = new HttpResponseMessage(HttpStatusCode.OK);

            result.Content = new ByteArrayContent(image.ImageData);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue(image.MimeType);
            return result; 
            

        }
    }
}
