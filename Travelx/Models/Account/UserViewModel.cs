using System;
using Travelx.Models.Identity;

namespace Travelx.Models.Account
{
    public sealed class UserViewModel
    {
        public string UserId { get; set; }
        public string Email { get; set; }

        public UserViewModel()
        {

        }

        public UserViewModel(ApplicationUser user)
        {
            UserId = user.Id;
            Email = user.Email;
        }
    }
}
