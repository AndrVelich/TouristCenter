using System.Web.Optimization;

namespace TouristCenter
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region [Loyout]

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/fa-svg-with-js.css"));

            bundles.Add(new StyleBundle("~/distSite/styles").Include(
                      "~/distSite/styles.*"));

            bundles.Add(new StyleBundle("~/distAdministration/styles").Include(
                      "~/distAdministration/styles.*"));


            bundles.Add(new ScriptBundle("~/distSite/siteApp")
                .Include("~/distSite/inline.*")
                .Include("~/distSite/polyfills.*")
                .Include("~/distSite/main.*")
                );

            bundles.Add(new ScriptBundle("~/distAdministration/administrationApp")
                .Include("~/distAdministration/inline.*")
                .Include("~/distAdministration/polyfills.*")
                .Include("~/distAdministration/main.*")
                );

            #endregion
        }
    }
}
