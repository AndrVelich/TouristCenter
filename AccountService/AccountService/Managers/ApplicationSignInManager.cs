using AccountService.Interfaces.Managers;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System.Security.Claims;
using System.Threading.Tasks;
using AccountSignInStatus = AccountService.Interfaces.Enums.SignInStatus;

namespace AccountService.Managers
{
    public class ApplicationSignInManager : SignInManager<ApplicationUser, string>, IApplicationSignInManager<AccountSignInStatus>
    {
        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager) :
            base(userManager, authenticationManager)
        { }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
        {
            return user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager);
        }

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }

        public AccountSignInStatus PasswordSignInAsync(string userName, string password, bool isPersistent, bool shouldLockout)
        {

            Task<SignInStatus> result = base.PasswordSignInAsync(userName, password, isPersistent, shouldLockout);
            return GetSignInStatus(result.Result);

        }

        private AccountSignInStatus GetSignInStatus(SignInStatus signInStatus)
        {
            switch (signInStatus)
            {
                case SignInStatus.Success:
                    return AccountSignInStatus.Success;
                case SignInStatus.LockedOut:
                    return AccountSignInStatus.LockedOut;
                case SignInStatus.RequiresVerification:
                    return AccountSignInStatus.LockedOut;
                case SignInStatus.Failure:
                    return AccountSignInStatus.Failure;
            }
            return AccountSignInStatus.Failure;
        }


    }
}
