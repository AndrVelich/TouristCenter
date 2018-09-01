using System.Web.Mvc;

namespace TouristCenter.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        [Route("administration")]
        [Route("tour")]
        [Route("tour/{type}/{country}")]
        public ActionResult Index()
        {
            return View();
        }
    }
}
