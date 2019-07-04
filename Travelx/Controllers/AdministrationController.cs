﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Travelx.Controllers
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
        //[Route("administration/register")]
        [Authorize]
        public IActionResult Index()
        {
            return AdminstrationLayout();
        }

        [Route("login")]
        public ActionResult Login()
        {
            return AdminstrationLayout();
        }

        //TODO A.V. ned to delete after first time registration
        [Route("administration/register")]
        public ActionResult Register()
        {
            return AdminstrationLayout();
        }

        private VirtualFileResult AdminstrationLayout()
        {
            return File("~/administration.html", "text/html");
        }
    }
}