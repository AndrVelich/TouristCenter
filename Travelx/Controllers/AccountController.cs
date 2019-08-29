using System.Linq;
using System.Threading.Tasks;
using AccountService.Interfaces.Exceptions;
using AccountService.Interfaces.Managers;
using AccountService.Interfaces.Models.Enums;
using EmailSender.Interfaces.Senders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Travelx.Models.Account;
using Travelx.Models.Common;
using Travelx.Models.Common.Page;

namespace Travelx.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly ISignInManager _signInManager;
        private readonly IUserManager _userManager;
        private readonly IAccountSender _accountSender;
        private readonly ILogger _logger;


        public AccountController(ISignInManager signInManager, IUserManager userManager, IAccountSender accountSender, ILogger<AccountController> logger)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _accountSender = accountSender;
            _logger = logger;
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
        public async Task<Result> RegisterAsync([FromBody]RegisterViewModel model)
        {
            try
            {
                var user = await _userManager.Register(model.Email, model.Password, model.FirstName, model.LastName);
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var url = Url.Action(
                    "ConfirmEmail",
                    "Account",
                    new { email = user.Email, token = token },
                    protocol: HttpContext.Request.Scheme);
                await _accountSender.SendRegistrationConfirmation(user, url);
            }
            catch (AccountResultException excpetion)
            {
                _logger.LogError(excpetion, "Error while creating user");
                Result.FailResult(excpetion.Message);
            }
            
            return Result.SuccessResult;
        }

        [HttpPut]
        [Route("api/account/user")]
        [AllowAnonymous]
        public async Task<Result> UpadteUserAsync([FromBody]UserViewModel model)
        {
            try
            {
                var user = await _userManager.GetUser(model.Email);
                user.NotificationEnabled = model.NotificationEnabled;
                await _userManager.UpdateUser(user);
            }
            catch (AccountResultException excpetion)
            {
                _logger.LogError(excpetion, "Error while updating user");
                Result.FailResult(excpetion.Message);
            }

            return Result.SuccessResult;
        }

        [HttpGet]
        [Authorize]
        [Route("api/account/userspage/{skip}/{take}")]
        public PageViewModel<UserViewModel> GetUsersPage(int skip, int take)
        {
            var accountUsersPage = _userManager.GetUsersPage(skip, take);
            var collection = accountUsersPage.UserCollection.Select(u => new UserViewModel(u)).ToList();
            var resut = new PageViewModel<UserViewModel>(accountUsersPage.UsersCount, collection);

            return resut;
        }

        [Authorize]
        [HttpDelete]
        [Route("api/account/user/{id}")]
        public async Task<Result> Delete(string id)
        {
            try
            {
                await _userManager.Delete(id);
            }
            catch (AccountResultException excpetion)
            {
                _logger.LogError(excpetion, "Error while deleting user");
                Result.FailResult(excpetion.Message);
            }

            return Result.SuccessResult;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string email, string token)
        {
            await _userManager.ConfirmEmailAsync(email, token);
            return Redirect("/administration");
        }

        [HttpGet]
        public ActionResult Logout()
        {
            _signInManager.Logout();
            return Redirect("/");
        }

        [HttpPut]
        [Authorize]
        [Route("api/account/confirm")]
        public async Task<Result> ConfirmEmailAdmin([FromBody]string email)
        {
            try
            {
                var user = await _userManager.GetUser(email);
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                await _userManager.ConfirmEmailAsync(email, token);
            }
            catch (AccountResultException excpetion)
            {
                _logger.LogError(excpetion, "Error while confirmation user email");
                Result.FailResult(excpetion.Message);
            }
            return Result.SuccessResult;
        }

        [HttpGet]
        [Authorize]
        [Route("api/account/currentUser")]
        public async Task<UserViewModel> GetCurrentUser()
        {
            var user = await _userManager.GetUser(HttpContext.User);
            var userViewModel = new UserViewModel(user);

            return userViewModel;
        }
    }
}
