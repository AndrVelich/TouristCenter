using System.ComponentModel.DataAnnotations;
using AccountService.Interfaces.Models;
using Microsoft.AspNetCore.Identity;

namespace AccountService.Models
{
    public class ApplicationUser : IdentityUser, IApplicationUser
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public bool NotificationEnabled { get; set; }
    }
}
