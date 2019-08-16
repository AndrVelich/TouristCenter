namespace AccountService.Interfaces.Models
{
    public interface IApplicationUser
    {
        string Id { get; }
        string Email { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        bool EmailConfirmed { get; set; }
        bool NotificationEnabled { get; set; }
    }
}
