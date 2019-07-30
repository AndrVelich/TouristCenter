using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Travelx.Storage.Context
{
    public static class TravelxDbContextConfigurator
    {
        public static void RegisterContext(IServiceCollection services, string connectionString)
        {
            services.AddDbContext<TravelxContext>(options =>
                options.UseSqlServer(connectionString/*, o => o.MigrationsAssembly("Travelx.Storage")*/));
        }
    }
}
