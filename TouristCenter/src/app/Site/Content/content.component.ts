import {
    Component,
    HostListener,
    Inject
} from "@angular/core";

import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
} from '@angular/animations';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderComponent } from "@siteCommon/Components/Order/order.component";

@Component({
    
    
    selector: "contentComponent",
    templateUrl: "content.component.html",
    styleUrls: ["content.component.css"],
    animations: [
        trigger('routerAnimation', [
            transition('* => *', [
                query(
                    ':enter',
                    [style({ opacity: 0 })],
                    { optional: true }
                ),
                query(
                    ':leave',
                    [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
                    { optional: true }
                ),
                query(
                    ':enter',
                    [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
                    { optional: true }
                )
            ])
        ])
    ]
})
export class ContentComponent {
    public isScrollToTopVisible: boolean = false;
    public isSticky: boolean = false;

    constructor(
        @Inject('window') private window: Window,
        public dialog: MatDialog) {

    }

    public onActivate() : void {
        this.fastScroll();
    }

    public scrolltoTop(): void {
        this.smoothScroll();
    }

    @HostListener('window:scroll', ['$event'])
    public onScroll(): void {
        this.setSideMenuFixed();
        this.setScrollToTopVisible();

    }

    public openOrderPopup(button: string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }

    private setScrollToTopVisible(): void {
        this.isScrollToTopVisible = this.window.pageYOffset > window.innerHeight;
    }

    public setSideMenuFixed(): void {
        let num = this.window.pageYOffset;
        if (num > 90) {
            this.isSticky = true;
        }
        else if (this.isSticky && num < 5) {
            this.isSticky = false;
        }
    }

    private fastScroll() {
        this.window.scroll(0, 0);
    }

    private smoothScroll() {
        try {
            this.window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } catch (e) {
            this.fastScroll();
        }
    }

}