using AccountService.Context;
using AccountService.Interfaces.Managers;
using AccountService.Managers;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AccountService.Configurator
{
    public static class IdentityConfigurator
    {
        public static void Configure(IServiceCollection services, string connectionString)
        {
            services.AddDbContext<IdentityContext>(options =>
                options.UseSqlServer(connectionString));
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<IdentityContext>();

            services.AddTransient<ISignInManager, SignInManager>();
            services.AddTransient<IUserManager, UserManager>();
        }
    }
}
