var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from "@angular/router";
import { MatDialogModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, } from '@angular/material';
import { CKEditorModule } from 'ckeditor4-angular';
import { CommonModule } from "@common/common.module";
import { routes } from "./administration.routes";
import { AdministrationComponent } from "./administration.component";
import { HeaderComponent } from "./Header/header.component";
import { FooterComponent } from "./Footer/footer.component";
import { LoginComponent } from "./Login/login.component";
import { AccountMenuComponent } from "./AccountMenu/accountMenu.component";
import { ContentComponent } from "./Content/content.component";
import { HomeComponent } from "./Content/Home/home.component";
import { CountriesComponent } from "./Content/Countries/countries.component";
import { CountryComponent } from "./Content/Countries/Country/country.component";
import { PromotionsComponent } from "./Content/Promotions/promotions.component";
import { PromotionComponent } from "./Content/Promotions/Promotion/promotion.component";
import { ToursComponent } from "./Content/Tours/tours.component";
import { TourComponent } from "./Content/Tours/Tour/tour.component";
import { RegisterComponent } from "./Content/Users/Register/register.component";
import { OrdersComponent } from "./Content/Orders/orders.component";
import { UsersComponent } from "./Content/Users/users.component";
import { ConfirmationPopupComponent } from "./Common/Components/ConfirmationPopup/confirmationPopup.component";
import { PagerComponent } from "./Common/Components/Pager/pager.component";
import { CountryService } from "./Common/Services/country.service";
import { TourService } from "./Common/Services/tour.service";
import { PromotionService } from "./Common/Services/promotion.service";
import { LoginService } from "./Common/Services/login.service";
import { RegisterService } from "./Common/Services/register.service";
import { OrderService } from "./Common/Services/order.service";
import { AccountService } from "./Common/Services/account.service";
import { CkeditorService } from "@administrationCommon/Services/ckeditor.service";
var AdministrationModule = /** @class */ (function () {
    function AdministrationModule() {
    }
    AdministrationModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                ReactiveFormsModule,
                FormsModule,
                MatDialogModule,
                MatSelectModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatMenuModule,
                TextMaskModule,
                CommonModule,
                CKEditorModule,
                //Obsolete
                HttpModule,
                HttpClientModule,
                RouterModule.forRoot(routes)
            ],
            providers: [
                CountryService,
                TourService,
                PromotionService,
                LoginService,
                RegisterService,
                OrderService,
                MatDatepickerModule,
                AccountService,
                CkeditorService
            ],
            entryComponents: [
                ConfirmationPopupComponent,
            ],
            declarations: [
                AdministrationComponent,
                HeaderComponent,
                FooterComponent,
                ContentComponent,
                HomeComponent,
                CountriesComponent,
                CountryComponent,
                ToursComponent,
                TourComponent,
                PromotionsComponent,
                PromotionComponent,
                LoginComponent,
                RegisterComponent,
                OrdersComponent,
                UsersComponent,
                AccountMenuComponent,
                ConfirmationPopupComponent,
                PagerComponent,
            ],
            exports: [
                AdministrationComponent,
                MatDialogModule,
                MatSelectModule,
                HttpModule
            ],
            bootstrap: [AdministrationComponent]
        })
    ], AdministrationModule);
    return AdministrationModule;
}());
export { AdministrationModule };
//# sourceMappingURL=administration.module.js.map