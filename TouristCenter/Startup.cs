using System.Configuration;
using System.Reflection;
using System.Web.Http;
using Microsoft.Owin;
using Ninject;
using Ninject.Modules;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using VirtualBuisnessCard.DI;

[assembly: OwinStartup(typeof(TouristCenter.Startup))]

namespace TouristCenter
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            WebApiConfig.Register(config);
            ConfigureAuth(app);
            RegisterDi(app, config);
        }

        //TODO move to additional Class(DiConfigurator)
        private void RegisterDi(IAppBuilder app, HttpConfiguration config)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            NinjectModule serviceModule = new DiConfiguration(connectionString);
            var kernel = new StandardKernel(serviceModule);
            kernel.Load(Assembly.GetExecutingAssembly());
            app.UseNinjectMiddleware(() => kernel);
            app.UseNinjectWebApi(config);
        }
    }
}
