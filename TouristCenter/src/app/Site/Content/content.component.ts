import { Component } from "@angular/core";

@Component({
    
    moduleId: module.id,
    selector: "contentComponent",
    template: '<router-outlet (activate)="onActivate()" ></router-outlet>'
})
export class ContentComponent {
    onActivate() {
        window.scroll(0,0);
    }
}