import { NgModule } from "@angular/core";

import { ClickOutsideDirective } from "./Directives/clickOutside.directive";

import { TourTypeService } from "./Services/tourType.service";
import { PreloaderService } from "./Services/preloader.service";
import { PagerService } from "./Services/pager.service";
import { RouterService } from "./Services/router.service";
import { HttpErrorInterceptorProvider } from './Interceptors/HttpErrorInterceptor';

@NgModule({
    imports:
    [],
    entryComponents:
    [],
    providers: 
    [
        TourTypeService,
        PreloaderService,
        PagerService,
        RouterService,
        HttpErrorInterceptorProvider,
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