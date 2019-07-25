using System.Collections.Generic;
using System.Linq;
using Travelx.Models.Identity;

namespace Travelx.Models.Account
{
    public sealed class UsersPage
    {
        public int UsersCount { get; set; }
        public List<UserViewModel> UserCollection { get; set; }

        public UsersPage()
        { }

        public UsersPage(int usersCount, IReadOnlyCollection<ApplicationUser> userCollection)
        {
            UsersCount = usersCount;
            UserCollection = userCollection.Select(u => new UserViewModel(u)).ToList();
        }
    }
}
