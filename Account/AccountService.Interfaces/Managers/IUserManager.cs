using System.Threading.Tasks;
using AccountService.Interfaces.Models;

namespace AccountService.Interfaces.Managers
{
    public interface IUserManager
    {
        Task<IApplicationUser> Register(string email, string password);
        Task Delete(string id);
        IUsersPage GetUsersPage(int skip, int take);
    }
}
