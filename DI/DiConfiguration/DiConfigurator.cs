using Microsoft.Extensions.DependencyInjection;
using Ninject.Modules;
using TouristCenter.Domain.Country.Managers;
using TouristCenter.Domain.Image.Managers;
using TouristCenter.Domain.Interfaces.Country.Managers;
using TouristCenter.Domain.Interfaces.Image.Managers;
using TouristCenter.Domain.Interfaces.Order.Managers;
using TouristCenter.Domain.Interfaces.Promotion.Managers;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Domain.Order.Managers;
using TouristCenter.Domain.Promotion.Managers;
using TouristCenter.Domain.Tour.Managers;
using TouristCenter.Storage.Country.Managers;
using TouristCenter.Storage.Image.Managers;
using TouristCenter.Storage.Interfaces.Country.Managers;
using TouristCenter.Storage.Interfaces.Image.Managers;
using TouristCenter.Storage.Interfaces.Order.Managers;
using TouristCenter.Storage.Interfaces.Promotion.Managers;
using TouristCenter.Storage.Interfaces.Tour.Managers;
using TouristCenter.Storage.Order.Managers;
using TouristCenter.Storage.Promotion.Managers;
using TouristCenter.Storage.Tour.Managers;

namespace DiConfiguration
{
    public sealed class DiConfigurator
    {
        private readonly string _connectionString;

        public DiConfigurator(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            RegisterBuisnessPart(services);
            RegisterDataPart(services);
        }

        private void RegisterBuisnessPart(IServiceCollection services)
        {
            services.AddTransient<IOrderManager, OrderManager>();
            services.AddTransient<ICountryManager, CountryManager>();
            services.AddTransient<ITourManager, TourManager>();
            services.AddTransient<IPromotionManager, PromotionManager>();
            services.AddTransient<IImageManager, ImageManager>();

        }

        private void RegisterDataPart(IServiceCollection services)
        {
            services.AddTransient<IOrderDataManager>(s => new OrderDataManager(_connectionString));
            services.AddTransient<ICountryDataManager>(s => new CountryDataManager(_connectionString));
            services.AddTransient<ITourDataManager>(s => new TourDataManager(_connectionString));
            services.AddTransient<IPromotionDataManager>(s => new PromotionDataManager(_connectionString));
            services.AddTransient<IImageDataManager>(s => new ImageDataManager(_connectionString));
        }
    }
}
