import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    
    moduleId: module.id,
    selector: "app-root",
    templateUrl: "app.component.html"
})
export class AppComponent {
    private administration : string = '/administration'

    constructor(private router: Router) {}

    get isAdministration() : boolean {
        var result = this.router.url.startsWith(this.administration)
        return result;
    }
}
