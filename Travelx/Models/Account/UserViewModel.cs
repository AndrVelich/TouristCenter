using AccountService.Interfaces.Models;

namespace Travelx.Models.Account
{
    public sealed class UserViewModel
    {
        public string UserId { get; set; }
        public string Email { get; set; }

        public UserViewModel()
        {

        }

        public UserViewModel(IApplicationUser user)
        {
            UserId = user.Id;
            Email = user.Email;
        }
    }
}
