using Ninject.Modules;
using TouristCenter.Domain.Interfaces.Order.Managers;
using TouristCenter.Domain.Order.Managers;
using TouristCenter.Storage.Interfaces.Order.Managers;
using TouristCenter.Storage.Order.Managers;

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

        }

        private void RegisterDataPart()
        {
            Bind<IOrderDataManager>().To<OrderDataManager>().WithConstructorArgument("connectionString", _connectionString);
        }
    }
}
