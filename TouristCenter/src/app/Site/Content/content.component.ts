import {
    Component,
    HostListener
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
import { OrderComponent } from '@siteModule/Order/order.component';

@Component({
    
    moduleId: module.id,
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

    constructor(
        public dialog: MatDialog) {

    }

    public onActivate() : void {
        this.fastScroll();
    }

    public scrolltoTop(): void {
        this.smoothScroll();
    }

    @HostListener('window:scroll', ['$event'])
    public setScrollToTopVisible() : void {
        this.isScrollToTopVisible = window.pageYOffset > window.innerHeight;
    }

    public openOrderPopup(button: string) {
        let dialogRef = this.dialog.open(OrderComponent, {
            data: button
        });
    }

    private fastScroll() {
        window.scroll(0, 0);
    }

    private smoothScroll() {
        try {
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } catch (e) {
            this.fastScroll();
        }
    }

}