//using AccountService.Interfaces.Managers;
//using AccountService.Interfaces.Models;
//using System.Net.Http;
//using System.Web;
//using System.Web.Http;
//using TouristCenter.Models;

//namespace TouristCenter.Controllers
//{
//    [Authorize]
//    public class MeController : ApiController
//    {
//        private IAccountManager _accountManager;
//        private IApplicationUserManager<IApplicationUser> _userManager;

//        public MeController(IAccountManager accountManager)
//        {
//            _accountManager = accountManager;
//        }

//        public IApplicationUserManager<IApplicationUser> UserManager
//        {
//            get
//            {
//                return _userManager ?? _accountManager.GetUserManager(Request.GetOwinContext());
//            }
//            private set
//            {
//                _userManager = value;
//            }
//        }

//        // GET api/Me
//        public GetViewModel Get()
//        {
//            //var user = UserManager.FindById(User.Identity.GetUserId());
//            //return new GetViewModel() { Hometown = user.Hometown };
//            return null;
//        }
//    }
//}