using System.Web.Mvc;

namespace TouristCenter.Controllers
{
    public class AdministrationController : Controller
    {
        [Route("administration")]
        [Route("administration/orders")]
        [Route("administration/countries")]
        [Route("administration/countries/new")]
        [Route("administration/countries/{tourType}/{country}")]
        [Route("administration/tours")]
        [Route("administration/tours/new")]
        [Route("administration/tours/{tourType}/{country}/{tour}")]
        [Route("administration/promotions")]
        [Route("administration/promotions/{promotion}")]
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [Route("administration/login")]
        public ActionResult Login()
        {
            return View("Index");
        }

        ////TODO A.V. ned to delete after first registration
        //[Route("administration/register")]
        //public ActionResult Register()
        //{
        //    return View("Index");
        //}
    }
}