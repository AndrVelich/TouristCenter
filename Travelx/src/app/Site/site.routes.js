import { HomeComponent } from "./Content/Home/home.component";
import { TourTypesComponent } from "./Content/TourTypes/tourTypes.component";
import { ContactsComponent } from "./Content/Contacts/contacts.component";
import { CountriesPageComponent } from "./Content/CountriesPage/countriesPage.component";
import { BeachCountryComponent } from "./Content/TourTypes/Beach/Country/beachCountry.component";
import { BeachToursComponent } from "./Content/TourTypes/Beach/Tours/beachTours.component";
import { BusToursComponent } from "./Content/TourTypes/Bus/Tours/busTours.component";
import { CorporateCountryComponent } from "./Content/TourTypes/Corporate/Country/corporateCountry.component";
import { CorporateToursComponent } from "./Content/TourTypes/Corporate/Tours/corporateTours.component";
import { IndividualCountryComponent } from "./Content/TourTypes/Individual/Country/individualCountry.component";
import { IndividualToursComponent } from "./Content/TourTypes/Individual/Tours/individualTours.component";
import { NewYearCountryComponent } from "./Content/TourTypes/NewYear/Country/newYearCountry.component";
import { NewYearToursComponent } from "./Content/TourTypes/NewYear/Tours/newYearTours.component";
import { SkiingCountryComponent } from "./Content/TourTypes/Skiing/Country/skiingCountry.component";
import { SkiingToursComponent } from "./Content/TourTypes/Skiing/Tours/skiingTours.component";
import { PromotionsComponent } from "./Content/Promotions/promotions.component";
import { PromotionDetailsComponent } from "./Content/Promotions/PromotionDetails/promotionDetails.component";
import { HotCountriesComponent } from "./Content/Hot/Countries/hotCountries.component";
import { HotToursComponent } from "./Content/Hot/Tours/hotTours.component";
import { EarlyCountriesComponent } from "./Content/EarlyBooking/Countries/earlyCountries.component";
import { EarlyToursComponent } from "./Content/EarlyBooking/Tours/earlyTours.component";
export var routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home/index',
        component: HomeComponent
    },
    {
        path: 'tour',
        component: TourTypesComponent
    },
    {
        path: 'countries',
        component: CountriesPageComponent
    },
    {
        path: 'tour/beach',
        component: BeachCountryComponent
    },
    {
        path: 'tour/beach/:country',
        component: BeachToursComponent
    },
    {
        path: 'tour/bus',
        component: BusToursComponent
    },
    {
        path: 'tour/corporate',
        component: CorporateCountryComponent
    },
    {
        path: 'tour/corporate/:country',
        component: CorporateToursComponent
    },
    {
        path: 'tour/individual',
        component: IndividualCountryComponent
    },
    {
        path: 'tour/individual/:country',
        component: IndividualToursComponent
    },
    {
        path: 'tour/newyear',
        component: NewYearCountryComponent
    },
    {
        path: 'tour/newyear/:country',
        component: NewYearToursComponent
    },
    {
        path: 'tour/skiing',
        component: SkiingCountryComponent
    },
    {
        path: 'tour/skiing/:country',
        component: SkiingToursComponent
    },
    {
        path: 'promotions',
        component: PromotionsComponent
    },
    {
        path: 'promotions/:promotion',
        component: PromotionDetailsComponent
    },
    {
        path: 'contacts',
        component: ContactsComponent
    },
    {
        path: 'hot-tours',
        component: HotCountriesComponent
    },
    {
        path: 'hot-tours/:country',
        component: HotToursComponent
    },
    {
        path: 'early-booking',
        component: EarlyCountriesComponent
    },
    {
        path: 'early-booking/:country',
        component: EarlyToursComponent
    },
];
//# sourceMappingURL=site.routes.js.map