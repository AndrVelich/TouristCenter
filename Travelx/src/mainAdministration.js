import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AdministrationModule } from './app/Administration/administration.module';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AdministrationModule)
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=mainAdministration.js.map