using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AccountService.Interfaces.Models;

namespace AccountService.Interfaces.Managers
{
    public interface IUserManager
    {
        Task<IApplicationUser> GetUser(string email);
        Task<IApplicationUser> GetUser(ClaimsPrincipal claimsUser);
        Task<IApplicationUser> UpdateUser(IApplicationUser user);
        Task<IApplicationUser> Register(string email, string password, string firstName, string lastName);
        Task Delete(string id);
        IUsersPage GetUsersPage(int skip, int take);
        IReadOnlyCollection<IApplicationUser> GetUsersNotificationEnabled();
        Task<string> GenerateEmailConfirmationTokenAsync(IApplicationUser user);
        Task<string> ConfirmEmailAsync(string email, string token);
    }
}
