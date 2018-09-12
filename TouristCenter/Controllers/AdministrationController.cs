using System.Web.Mvc;

namespace TouristCenter.Controllers
{
    public class AdministrationController : Controller
    {
        [Route("administration")]
        [Route("administration/countries")]
        [Route("administration/countries/{country}")]
        public ActionResult Index()
        {
            return View();
        }
    }
}