using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Travelx.Models.Account;
using Travelx.Models.Common;
using Travelx.Models.Identity;

namespace Travelx.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("api/account/login")]
        [AllowAnonymous]
        public async Task<Result> Login([FromBody]LoginViewModel model)
        {
            var identityResult = await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: model.RememberMe, lockoutOnFailure: false);
            if (identityResult.Succeeded)
            {
                return Result.SuccessResult;
            }
            if (identityResult.IsLockedOut)
            {
                return Result.FailResult(LoginResult.LockedOut);
            }
            if (identityResult.IsNotAllowed)
            {
                return Result.FailResult(LoginResult.NotAllowed);
            }

            return Result.FailResult(LoginResult.Fail);
        }

        [HttpPost]
        [Route("api/account/register")]
        //TODO A.V. need to delete [AllowAnonymous] after first registration
        [AllowAnonymous]
        public async Task<Result> Register([FromBody]RegisterViewModel model)
        {
            Result result;
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var identityResult = await _userManager.CreateAsync(user, model.Password);

            if (identityResult.Succeeded)
            {
                result = Result.SuccessResult;
            }
            else
            {
                var errorMessage = identityResult.Errors.FirstOrDefault()?.Description;
                result = Result.FailResult(errorMessage);
            }
            return result;
        }

        [HttpGet]
        [Authorize]
        [Route("api/account/userspage/{skip}/{take}")]
        public UsersPage GetUsersPage(int skip, int take)
        {
            var usersCount = _userManager.Users.Count();
            var users = _userManager.Users.Skip(skip).Take(take).ToList();
            var resut = new UsersPage(usersCount, users);

            return resut;
        }

        [Authorize]
        [HttpDelete]
        [Route("api/account/user/{id}")]
        public async Task<Result> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            await _userManager.DeleteAsync(user);

            return Result.SuccessResult;
        }
    }
}
