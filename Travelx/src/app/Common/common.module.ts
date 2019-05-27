import { NgModule } from "@angular/core";

import { ClickOutsideDirective } from "./Directives/clickOutside.directive";
import { Dictionary } from "./Types/Dictionary";

import { TourTypeService } from "./Services/tourType.service";
import { PreloaderService } from "./Services/preloader.service";


@NgModule({
    imports:
    [],
    entryComponents:
    [],
    providers: 
    [
        TourTypeService,
        PreloaderService,
    ],
    declarations:
    [
        ClickOutsideDirective
    ],
    exports: [
        ClickOutsideDirective,
    ]
})
export class CommonModule { }