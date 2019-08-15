using AccountService.Configurator;
using AccountService.Interfaces.Managers;
using AccountService.Managers;
using EmailSender.Configurator;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Travelx.Domain.Country.Managers;
using Travelx.Domain.Image.Managers;
using Travelx.Domain.Interfaces.Country.Managers;
using Travelx.Domain.Interfaces.Image.Managers;
using Travelx.Domain.Interfaces.Order.Managers;
using Travelx.Domain.Interfaces.Promotion.Managers;
using Travelx.Domain.Interfaces.Tour.Managers;
using Travelx.Domain.Order.Managers;
using Travelx.Domain.Promotion.Managers;
using Travelx.Domain.Tour.Managers;
using Travelx.Storage.Context;
using Travelx.Storage.Country.Managers;
using Travelx.Storage.Image.Managers;
using Travelx.Storage.Interfaces.Country.Managers;
using Travelx.Storage.Interfaces.Image.Managers;
using Travelx.Storage.Interfaces.Order.Managers;
using Travelx.Storage.Interfaces.Promotion.Managers;
using Travelx.Storage.Interfaces.Tour.Managers;
using Travelx.Storage.Order.Managers;
using Travelx.Storage.Promotion.Managers;
using Travelx.Storage.Tour.Managers;

namespace DiConfiguration
{
    public sealed class DiConfigurator
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public DiConfigurator(string connectionString, IConfiguration configuration)
        {
            _connectionString = connectionString;
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            RegisterBuisnessPart(services);
            RegisterDataPart(services);
        }

        private void RegisterBuisnessPart(IServiceCollection services)
        {
            IdentityConfigurator.Configure(services, _connectionString);
            EmailSenderConfigurator.Configure(services, _configuration);

            services.AddTransient<IOrderManager, OrderManager>();
            services.AddTransient<ICountryManager, CountryManager>();
            services.AddTransient<ITourManager, TourManager>();
            services.AddTransient<IPromotionManager, PromotionManager>();
            services.AddTransient<IImageManager, ImageManager>();
        }

        private void RegisterDataPart(IServiceCollection services)
        {
            services.AddTransient(s => new TravelxContext(_connectionString));
            TravelxDbContextConfigurator.RegisterContext(services, _connectionString);

            services.AddTransient<IOrderDataManager, OrderDataManager>();
            services.AddTransient<ICountryDataManager, CountryDataManager>();
            services.AddTransient<ITourDataManager, TourDataManager>();
            services.AddTransient<IPromotionDataManager, PromotionDataManager>();
            services.AddTransient<IImageDataManager, ImageDataManager>();
        }
    }
}
