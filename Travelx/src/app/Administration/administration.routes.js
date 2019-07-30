import { ContentComponent } from "./Content/content.component";
import { CountriesComponent } from "./Content/Countries/countries.component";
import { CountryComponent } from "./Content/Countries/Country/country.component";
import { ToursComponent } from "./Content/Tours/tours.component";
import { TourComponent } from "./Content/Tours/Tour/tour.component";
import { PromotionsComponent } from "./Content/Promotions/promotions.component";
import { PromotionComponent } from "./Content/Promotions/Promotion/promotion.component";
import { RegisterComponent } from "./Content/Register/register.component";
import { OrdersComponent } from "./Content/Orders/orders.component";
import { UsersComponent } from "./Content/Users/users.component";
import { LoginComponent } from "./Login/login.component";
export var routes = [
    {
        path: 'administration',
        component: ContentComponent,
        children: [
            {
                path: '',
                redirectTo: 'orders',
                pathMatch: 'full'
            },
            {
                path: 'countries',
                component: CountriesComponent
            },
            {
                path: 'countries/:tourType/:country',
                component: CountryComponent
            },
            {
                path: 'countries/new',
                component: CountryComponent
            },
            {
                path: 'tours',
                component: ToursComponent
            },
            {
                path: 'tours/new',
                component: TourComponent
            },
            {
                path: 'tours/:tourType/:country/:tour',
                component: TourComponent
            },
            {
                path: 'promotions',
                component: PromotionsComponent
            },
            {
                path: 'promotions/:promotion',
                component: PromotionComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
];
//# sourceMappingURL=administration.routes.js.map