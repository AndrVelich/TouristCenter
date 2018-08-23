using Microsoft.Owin;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity.EntityFramework;
using AccountService.Data;
using AccountService.Managers;
using AccountService.Interfaces.Models;
using AccountService.Interfaces.Managers;
using AccountSignInStatus = AccountService.Interfaces.Enums.SignInStatus;

namespace AccountService
{
    public class AccountManager : IAccountManager
    {
        public IApplicationUserManager<IApplicationUser> GetUserManager(IOwinContext OwinContext)
        {
            return OwinContext.GetUserManager<ApplicationUserManager>() ?? new ApplicationUserManager(new UserStore<ApplicationUser>(new ApplicationDbContext()));
        }

        public IApplicationSignInManager<AccountSignInStatus> GetSignInManager(IOwinContext OwinContext)
        {
            return OwinContext.Get<ApplicationSignInManager>() ?? new ApplicationSignInManager(new ApplicationUserManager(new UserStore<ApplicationUser>(new ApplicationDbContext())), OwinContext.Authentication);
        }
    }
}
