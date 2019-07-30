using System.Collections.Generic;
using System.Linq;
using AccountService.Interfaces.Models;
using AccountService.Models;

namespace Travelx.Models.Account
{
    public sealed class UsersPageViewModel
    {
        public int UsersCount { get; set; }
        public List<UserViewModel> UserCollection { get; set; }

        public UsersPageViewModel()
        { }

        public UsersPageViewModel(IUsersPage usersPage)
        {
            UsersCount = usersPage.UsersCount;
            UserCollection = usersPage.UserCollection.Select(u => new UserViewModel(u)).ToList();
        }
    }
}
