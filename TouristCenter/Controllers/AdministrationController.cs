using System.Web.Mvc;

namespace TouristCenter.Controllers
{
    public class AdministrationController : Controller
    {
        [Route("administration")]
        [Route("administration/countries")]
        public ActionResult Index()
        {
            return View();
        }
    }
}