using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace TouristCenter.Controllers
{
    public class ImageController : ApiController
    {
        public ImageController()
        {
            
        }

        [HttpGet()]
        [ActionName("imageTest")]
        public HttpResponseMessage GetImageTest()
        {
            string filePath = @"e:\MyApplications\TouristCenter\TouristCenter\Content\Images\beach_header.jpg";

            var result = new HttpResponseMessage(HttpStatusCode.OK);

            FileStream fileStream = new FileStream(filePath, FileMode.Open);
            Image image = Image.FromStream(fileStream);
            MemoryStream memoryStream = new MemoryStream();
            image.Save(memoryStream, ImageFormat.Jpeg);

            result.Content = new ByteArrayContent(memoryStream.ToArray());
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
            return result; 
            

        }
    }
}
