using System.Collections.Generic;

namespace AccountService.Interfaces.Models
{
    public interface IUsersPage
    {
        int UsersCount { get; set; }
        IReadOnlyCollection<IApplicationUser> UserCollection { get; set; }
    }
}
