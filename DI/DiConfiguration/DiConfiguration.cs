using AccountService;
using AccountService.Interfaces.Managers;
using Ninject.Modules;
using TouristCenter.Domain.Interfaces.Order.Managers;
using TouristCenter.Domain.Order.Managers;
using TouristCenter.Domain.Interfaces.Tour.Managers;
using TouristCenter.Domain.Tour.Managers;

using TouristCenter.Storage.Interfaces.Order.Managers;
using TouristCenter.Storage.Order.Managers;
using TouristCenter.Storage.Interfaces.Tour.Managers;
using TouristCenter.Storage.Tour.Managers;


namespace VirtualBuisnessCard.DI
{
    public sealed class DiConfiguration : NinjectModule
    {
        private readonly string _connectionString;

        public DiConfiguration(string connectionString)
        {
            _connectionString = connectionString;
        }

        public override void Load()
        {
            RegisterBuisnessPart();
            RegisterDataPart();
        }

        private void RegisterBuisnessPart()
        {
            Bind<IOrderManager>().To<OrderManager>();
            Bind<ITourManager>().To<TourManager>();
            Bind<IHotelManager>().To<HotelManager>();
            Bind<IApartmentManager>().To<ApartmentManager>();
            Bind<IAccountManager>().To<AccountManager>();

        }

        private void RegisterDataPart()
        {
            Bind<IOrderDataManager>().To<OrderDataManager>().WithConstructorArgument("connectionString", _connectionString);
            Bind<ITourDataManager>().To<TourDataManager>().WithConstructorArgument("connectionString", _connectionString);
            Bind<IHotelDataManager>().To<HotelDataManager>().WithConstructorArgument("connectionString", _connectionString);
            Bind<IApartmentDataManager>().To<ApartmentDataManager>().WithConstructorArgument("connectionString", _connectionString);

        }
    }
}
