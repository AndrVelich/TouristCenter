using System.Web.Mvc;

namespace TouristCenter.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        [Route("administration")]
        public ActionResult Index()
        {
            return View();
        }
    }
}
