using System.Threading.Tasks;
using AccountService.Interfaces.Models.Enums;

namespace AccountService.Interfaces.Managers
{
    public interface ISignInManager
    {
        Task<LoginResultEnum> Login(string email, string password, bool isPersistent, bool lockoutOnFailure);
    }
}
