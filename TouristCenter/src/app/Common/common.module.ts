import { NgModule } from "@angular/core";

import { ClickOutsideDirective } from "./Directives/clickOutside.directive";
import { TourTypeService } from "./Services/tourType.service";
import { Dictionary } from "./Types/Dictionary";

@NgModule({
    imports:
    [],
    entryComponents:
    [],
    providers: 
    [
        TourTypeService
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