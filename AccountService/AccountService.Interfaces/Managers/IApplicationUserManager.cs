
namespace AccountService.Interfaces.Managers
{
    public interface IApplicationUserManager<IApplicationUser>
    {
        IApplicationUser CreateUser();
        bool SaveUser(IApplicationUser user, string password);
        bool SaveUser(IApplicationUser user);
    }
}
