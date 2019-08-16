using AccountService.Interfaces.Models;
using Microsoft.AspNetCore.Identity;

namespace AccountService.Models
{
    public class ApplicationUser : IdentityUser, IApplicationUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool NotificationEnabled { get; set; }
    }
}
