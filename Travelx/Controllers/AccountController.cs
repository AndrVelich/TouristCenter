using System.Threading.Tasks;
using AccountService.Interfaces.Exceptions;
using AccountService.Interfaces.Models.Enums;
using AccountService.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Travelx.Models.Account;
using Travelx.Models.Common;

namespace Travelx.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly SignInManager _signInManager;
        private readonly UserManager _userManager;

        public AccountController(SignInManager signInManager, UserManager userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("api/account/login")]
        [AllowAnonymous]
        public async Task<Result> Login([FromBody]LoginViewModel model)
        {
            var loginResult = await _signInManager.Login(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
            
            if (loginResult != LoginResultEnum.Success)
            {
                var message = LoginResult.GetLoginResultMessage(loginResult);
                return Result.FailResult(message);
                
            }

            return Result.SuccessResult;
        }

        [HttpPost]
        [Route("api/account/register")]
        //TODO A.V. need to delete [AllowAnonymous] after first registration
        [AllowAnonymous]
        public async Task<Result> Register([FromBody]RegisterViewModel model)
        {
            try
            {
                await _userManager.Register(model.Email, model.Password);
            }
            catch (AccountResultException excpetion)
            {
                Result.FailResult(excpetion.Message);
            }
            
            return Result.SuccessResult;
        }

        [HttpGet]
        [Authorize]
        [Route("api/account/userspage/{skip}/{take}")]
        public UsersPageViewModel GetUsersPage(int skip, int take)
        {
            var accountUsersPage = _userManager.GetUsersPage(skip, take);
            var resut = new UsersPageViewModel(accountUsersPage);

            return resut;
        }

        [Authorize]
        [HttpDelete]
        [Route("api/account/user/{id}")]
        //TODO doesn't work
        public async Task<Result> Delete(string id)
        {
            try
            {
                await _userManager.Delete(id);
            }
            catch (AccountResultException excpetion)
            {
                Result.FailResult(excpetion.Message);
            }

            return Result.SuccessResult;
        }
    }
}
