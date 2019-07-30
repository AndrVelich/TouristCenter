using AccountService.Interfaces.Models;
using Microsoft.AspNetCore.Identity;

namespace AccountService.Models
{
    public class ApplicationUser : IdentityUser, IApplicationUser
    {
    }
}
