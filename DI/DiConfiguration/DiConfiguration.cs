﻿using AccountService;
using AccountService.Interfaces.Managers;
using Ninject.Modules;
using TouristCenter.Domain.Country.Managers;
using TouristCenter.Domain.Image.Managers;
using TouristCenter.Domain.Interfaces.Country.Managers;
using TouristCenter.Domain.Interfaces.Image.Managers;
using TouristCenter.Domain.Interfaces.Order.Managers;
using TouristCenter.Domain.Order.Managers;
using TouristCenter.Storage.Country.Managers;
using TouristCenter.Storage.Image.Managers;
using TouristCenter.Storage.Interfaces.Country.Managers;
using TouristCenter.Storage.Interfaces.Image.Managers;
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
            Bind<ICountryManager>().To<CountryManager>();
            Bind<IImageManager>().To<ImageManager>();

            Bind<IAccountManager>().To<AccountManager>();

        }

        private void RegisterDataPart()
        {
            Bind<IOrderDataManager>().To<OrderDataManager>().WithConstructorArgument("connectionString", _connectionString);
            Bind<ICountryDataManager>().To<CountryDataManager>().WithConstructorArgument("connectionString", _connectionString);
            Bind<IImageDataManager>().To<ImageDataManager>().WithConstructorArgument("connectionString", _connectionString);
        }
    }
}
