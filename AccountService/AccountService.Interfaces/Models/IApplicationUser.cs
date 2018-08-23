namespace AccountService.Interfaces.Models
{
    public interface IApplicationUser
    {
        string Hometown { get; set; }
        string Email { get; set; }
        string Id { get; set; }
        string UserName { get; set; }
    }
}
