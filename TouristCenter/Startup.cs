using System.Configuration;
using System.Data.Entity;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using log4net;
using log4net.Config;
using Microsoft.Owin;
using Ninject;
using Ninject.Modules;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;

[assembly: OwinStartup(typeof(TouristCenter.Startup))]

namespace TouristCenter
{
    public partial class Startup
    {

        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            GlobalConfiguration.Configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
            Logger.InitLogger();
            config.Services.Replace(typeof(IExceptionLogger), new UnhandledExceptionLogger());
            WebApiConfig.Register(config);
            ConfigureAuth(app);
            RegisterDi(app, config);

            //GlobalConfiguration.Configure(WebApiConfig.Register);
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        //TODO move to additional Class(DiConfigurator)
        private void RegisterDi(IAppBuilder app, HttpConfiguration config)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //NinjectModule serviceModule = new DiConfiguration.DiConfiguration(connectionString);
            //var kernel = new StandardKernel(serviceModule);
            //kernel.Load(Assembly.GetExecutingAssembly());
            //app.UseNinjectMiddleware(() => kernel);
            app.UseNinjectWebApi(config);
        }

        public class UnhandledExceptionLogger : ExceptionLogger
        {
            public override void Log(ExceptionLoggerContext context)
            {
                Logger.Log.Error(context.Exception.Message, context.Exception);
            }
        }

        public static class Logger
        {
            private static ILog log = LogManager.GetLogger("LOGGER");


            public static ILog Log
            {
                get { return log; }
            }

            public static void InitLogger()
            {
                XmlConfigurator.Configure();
            }
        }
    }
}
