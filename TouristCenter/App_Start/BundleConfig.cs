using System;
using System.Collections.Generic;
using System.Linq;
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

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/node_modules/core-js/client/shim.min.js",
                      "~/node_modules/reflect-metadata/Reflect.js",
                      "~/node_modules/systemjs/dist/system.src.js",
                      "~/node_modules/zone.js/dist/zone.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/site600.css",
                      "~/Content/site960.css",
                      "~/Content/fa-svg-with-js.css"));

            #endregion
        }
    }
}
