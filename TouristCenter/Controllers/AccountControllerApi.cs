//using Microsoft.AspNet.Identity.Owin;
//using System.Threading.Tasks;
//using System.Web;
//using System.Web.Http;
//using TouristCenter.Models;

//namespace TouristCenter.Controllers
//{
//    public class AccountController : ApiController
//    {
//        private ApplicationSignInManager _signInManager;
//        private ApplicationUserManager _userManager;

//        public AccountController()
//        {
//        }

//        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
//        {
//            UserManager = userManager;
//            SignInManager = signInManager;
//        }

//        public ApplicationSignInManager SignInManager
//        {
//            get
//            {
//                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
//            }
//            private set
//            {
//                _signInManager = value;
//            }
//        }

//        public ApplicationUserManager UserManager
//        {
//            get
//            {
//                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
//            }
//            private set
//            {
//                _userManager = value;
//            }
//        }

//        [HttpPost]
//        [Route("api/account/login")]
//        [AllowAnonymous]
//        public async Task<string> Login(LoginViewModel model)
//        {
//            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);
//            switch (result)
//            {
//                case SignInStatus.Success:
//                    return "success";
//                case SignInStatus.LockedOut:
//                    return "lockedOut";
//                case SignInStatus.Failure:
//                default:
//                    return "failure";
//            }
//        }

//        [HttpPost]
//        [Route("api/account/register")]
//        //TODO A.V. need to delete after first registration
//        [AllowAnonymous]
//        public async Task<string> Register(RegisterViewModel model)
//        {
//            var user = new ApplicationUser { UserName = model.Email, Email = model.Email, Hometown = model.Hometown };
//            var result = await UserManager.CreateAsync(user, model.Password);
//            if (result.Succeeded)
//            {
//                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);

//                return "success";
//            }

//            return "fail";

//        }
//    }
//}
