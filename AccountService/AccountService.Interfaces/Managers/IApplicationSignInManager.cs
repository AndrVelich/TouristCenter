namespace AccountService.Interfaces.Managers
{
    public interface IApplicationSignInManager<TSignInStatus>
    {
        TSignInStatus PasswordSignInAsync(string userName, string password, bool isPersistent, bool shouldLockout);
    }
}
