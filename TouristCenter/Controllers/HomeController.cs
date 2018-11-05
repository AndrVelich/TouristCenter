using System.Web.Mvc;

namespace TouristCenter.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]  
        [Route("tour")]
        [Route("tour/{type}")]
        [Route("tour/{type}/{country}")]
        [Route("promotions")]
        [Route("promotions/{promotion}")]
        [Route("contacts")]
        public ActionResult Index()
        {
            return View();
        }
    }
}
