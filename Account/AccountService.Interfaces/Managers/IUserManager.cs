using System.Collections.Generic;
using System.Threading.Tasks;
using AccountService.Interfaces.Models;

namespace AccountService.Interfaces.Managers
{
    public interface IUserManager
    {
        Task<IApplicationUser> GetUser(string email);
        Task<IApplicationUser> UpdateUser(IApplicationUser user);
        Task<IApplicationUser> Register(string email, string password);
        Task Delete(string id);
        IUsersPage GetUsersPage(int skip, int take);
        IReadOnlyCollection<IApplicationUser> GetUsersNotificationEnabled();
        Task<string> GenerateEmailConfirmationTokenAsync(IApplicationUser user);
        Task<string> ConfirmEmailAsync(string email, string token);
    }
}
