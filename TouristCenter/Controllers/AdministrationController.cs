using System.Web.Mvc;

namespace TouristCenter.Controllers
{
    public class AdministrationController : Controller
    {
        [Route("administration")]
        [Route("administration/countries")]
        [Route("administration/countries/{tourType}/{country}")]
        [Route("administration/tours")]
        [Route("administration/tours/{tour}")]
        public ActionResult Index()
        {
            return View();
        }
    }
}