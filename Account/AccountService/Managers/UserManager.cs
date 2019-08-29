using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

        public async Task<IApplicationUser> GetUser(string email)
        {
            var user = await GetUserByEmail(email);
            return user;
        }

        public async Task<IApplicationUser> GetUser(ClaimsPrincipal claimsUser)
        {
            var user = await _userManager.GetUserAsync(claimsUser);
            if (user == null)
            {
                throw new UserNotFoundException();
            }
            return user;
        }

        public async Task<IApplicationUser> UpdateUser(IApplicationUser user)
        {
            var identityUser = user as ApplicationUser;
            await _userManager.UpdateAsync(identityUser);
            return user;
        }

        //TODO create domain model
        public async Task<IApplicationUser> Register(string email, string password, string firstName, string lastName)
        {
            var user = new ApplicationUser { UserName = email, Email = email, FirstName = firstName, LastName = lastName };
            var identityResult = await _userManager.CreateAsync(user, password);
            user = await GetUserByEmail(email);
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

        public IReadOnlyCollection<IApplicationUser> GetUsersNotificationEnabled()
        {
            var users = _userManager.Users.Where(u => u.EmailConfirmed && u.NotificationEnabled).ToList();
            var resut = users;

            return resut;
        }

        public IUsersPage GetUsersPage(int skip, int take)
        {
            var usersCount = _userManager.Users.Count();
            var users = _userManager.Users.Skip(skip).Take(take).ToList();
            var resut = new UsersPage(usersCount, users);

            return resut;
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(IApplicationUser user)
        {
            var identityUser = user as ApplicationUser;
            if (identityUser == null)
            {
                throw new UserNotFoundException();
            }
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);

            return token;
        }

        public async Task<string> ConfirmEmailAsync(string email, string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                throw new TokenNotValidException();
            }
            var user = await GetUserByEmail(email);
            var result = await _userManager.ConfirmEmailAsync(user, token);
            CheckIdentityResult(result);
            return token;
        }

        private void CheckIdentityResult(IdentityResult identityResult)
        {
            if (!identityResult.Succeeded)
            {
                var errorMessage = identityResult.Errors.FirstOrDefault()?.Description;
                throw new AccountResultException(errorMessage);
            }
        }

        private async Task<ApplicationUser> GetUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new UserNotFoundException();
            }

            return user;
        }
    }
}
