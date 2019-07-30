using System.Linq;
using System.Threading.Tasks;
using AccountService.Interfaces.Exceptions;
using AccountService.Interfaces.Managers;
using AccountService.Interfaces.Models;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;

namespace AccountService.Managers
{
    public class UserManager : IUserManager
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserManager(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IApplicationUser> Register(string email, string password)
        {
            var user = new ApplicationUser { UserName = email, Email = email };
            var identityResult = await _userManager.CreateAsync(user, password);
            user = await _userManager.FindByEmailAsync(email);

            CheckIdentityResult(identityResult);

            return user;
        }

        public async Task Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new UserNotFoundException();
            }

            var identityResult = await _userManager.DeleteAsync(user);

            CheckIdentityResult(identityResult);
        }

        public IUsersPage GetUsersPage(int skip, int take)
        {
            var usersCount = _userManager.Users.Count();
            var users = _userManager.Users.Skip(skip).Take(take).ToList();
            var resut = new UsersPage(usersCount, users);

            return resut;
        }

        private void CheckIdentityResult(IdentityResult identityResult)
        {
            if (!identityResult.Succeeded)
            {
                var errorMessage = identityResult.Errors.FirstOrDefault()?.Description;
                throw new AccountResultException(errorMessage);
            }
        }
    }
}
