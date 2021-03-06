import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SiteModule } from './app/Site/site.module';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(SiteModule)
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=mainSite.js.map