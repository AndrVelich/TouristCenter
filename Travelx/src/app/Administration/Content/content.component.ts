import { Component } from "@angular/core";
import { PreloaderService } from "@common/Services/preloader.service"; 

@Component({
    selector: "contentComponent",
    templateUrl: "content.component.html",
    styleUrls: ["content.component.css"]
})
export class ContentComponent {

    constructor(
        public preloaderService: PreloaderService) { }

    public isPreloaderInProgress(): boolean {
        var result = this.preloaderService.isPreloaderInProgress();
        return result;
    }
}