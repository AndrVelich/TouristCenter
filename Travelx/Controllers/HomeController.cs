using Microsoft.AspNetCore.Mvc;

namespace Travelx.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        [Route("tour")]
        [Route("countries")]
        [Route("tour/{type}")]
        [Route("tour/{type}/{country}")]
        [Route("promotions")]
        [Route("promotions/{promotion}")]
        [Route("contacts")]
        [Route("hot-tours")]
        [Route("hot-tours/{country}")]
        [Route("early-booking")]
        [Route("early-booking/{country}")]
        public IActionResult Index()
        {
            return File("~/distSite/index.html", "text/html");
        }
    }
}
