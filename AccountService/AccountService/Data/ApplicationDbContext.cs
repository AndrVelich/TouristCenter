using Microsoft.AspNet.Identity.EntityFramework;

namespace AccountService.Data
{
    //TODO A.V. need to move it in the data assembly(not now)
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}
