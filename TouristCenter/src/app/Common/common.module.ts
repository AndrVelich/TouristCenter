import { NgModule } from "@angular/core";

import { ClickOutsideDirective } from "./Directives/clickOutside.directive";

@NgModule({
    imports:
    [],
    entryComponents:
    [],
    declarations:
    [
        ClickOutsideDirective
    ],
    exports: [
        ClickOutsideDirective
    ]
})
export class CommonModule { }