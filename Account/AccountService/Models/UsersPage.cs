using System.Collections.Generic;
using AccountService.Interfaces.Models;

namespace AccountService.Models
{
    public sealed class UsersPage : IUsersPage
    {
        public int UsersCount { get; set; }
        public IReadOnlyCollection<IApplicationUser> UserCollection { get; set; }

        public UsersPage()
        { }

        public UsersPage(int usersCount, IReadOnlyCollection<ApplicationUser> userCollection)
        {
            UsersCount = usersCount;
            UserCollection = userCollection;
        }
    }
}
