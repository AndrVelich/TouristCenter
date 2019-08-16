using System.Threading.Tasks;
using AccountService.Interfaces.Managers;
using AccountService.Interfaces.Models.Enums;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;

namespace AccountService.Managers
{
    public class SignInManager : ISignInManager
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public SignInManager(SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task<LoginResultEnum> Login(string email, string password, bool isPersistent, bool lockoutOnFailure)
        {
            var identityResult = await _signInManager.PasswordSignInAsync(email, password, isPersistent, lockoutOnFailure);

            if (identityResult.Succeeded)
            {
                return LoginResultEnum.Success;
            }
            if (identityResult.IsLockedOut)
            {
                return LoginResultEnum.LockedOut;
            }
            if (identityResult.IsNotAllowed)
            {
                return LoginResultEnum.NotAllowed;
            }

            return LoginResultEnum.Fail;
        }

        //TODO implement
        public async Task<bool> Logout()
        {
            return false;
        }
    }
}
