using System.Web.Mvc;

namespace TouristCenter.Controllers
{
    public class AdministrationController : Controller
    {
        [Route("administration")]
        [Route("administration/countries")]
        [Route("administration/countries/new")]
        [Route("administration/countries/{tourType}/{country}")]
        [Route("administration/tours")]
        [Route("administration/tours/new")]
        [Route("administration/tours/{tourType}/{country}/{tour}")]
        [Route("administration/promotions")]
        [Route("administration/promotions/{promotion}")]
        public ActionResult Index()
        {
            return View();
        }
    }
}