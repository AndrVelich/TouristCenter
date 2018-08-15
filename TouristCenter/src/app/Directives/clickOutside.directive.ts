import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {
    }

    @Input()
    public callbackName: string; 

    @Input()
    public componentContext: any;

    //@Output()
    //public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: ElementRef) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            //this.clickOutside.emit(targetElement);
            this.componentContext[this.callbackName]();
        }
    }
}