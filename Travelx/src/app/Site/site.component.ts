import { Component } from "@angular/core";
import { PreloaderService } from "@common/Services/preloader.service"; 

@Component({
    
    
    selector: "siteComponent",
    templateUrl: "site.component.html",
    styleUrls: ["site.component.css"],
})
export class SiteComponent {
    constructor(
        public preloaderService : PreloaderService)
    {
        
    }

    public isPreloaderInProgress(): boolean
    {
        var result = this.preloaderService.isPreloaderInProgress();
        return result;
    }
}
