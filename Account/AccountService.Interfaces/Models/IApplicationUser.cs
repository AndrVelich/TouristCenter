namespace AccountService.Interfaces.Models
{
    public interface IApplicationUser
    {
        string Id { get; }
        string UserName { get; set; }
        string Email { get; set; }
    }
}
