using AccountService.Interfaces.Models;

namespace Travelx.Models.Account
{
    public sealed class UserViewModel
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool NotificationEnabled { get; set; }

        public UserViewModel()
        {

        }

        public UserViewModel(IApplicationUser user)
        {
            UserId = user.Id;
            Email = user.Email;
            FirstName = user.FirstName;
            LastName = user.LastName;
            EmailConfirmed = user.EmailConfirmed;
            NotificationEnabled = user.NotificationEnabled;
        }
    }
}
