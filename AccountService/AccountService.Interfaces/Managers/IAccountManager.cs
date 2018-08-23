using AccountService.Interfaces.Enums;
using AccountService.Interfaces.Models;
using Microsoft.Owin;

namespace AccountService.Interfaces.Managers
{
    public interface IAccountManager
    {
        IApplicationUserManager<IApplicationUser> GetUserManager(IOwinContext owinContext);

        IApplicationSignInManager<SignInStatus> GetSignInManager(IOwinContext owinContext);
    }
}
