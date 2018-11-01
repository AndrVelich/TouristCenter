import {
    Component,
    Inject,
    OnDestroy,
    Renderer2,

    ElementRef, Input, Output, EventEmitter, HostListener

} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatSelectModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: "confirmationPopupComponent",
    templateUrl: "confirmationPopup.component.html",
    styleUrls: ["confirmationPopup.component.css"]
})
export class ConfirmationPopupComponent implements OnDestroy {
    private index: number;

    constructor(
      public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Array<number>,
      private renderer: Renderer2
      )
    {
        this.renderer.addClass(document.body, 'modal-open');
    }

    ngOnInit() 
    {
        
    }
 
    public cancel(): void 
    {
       this.dialogRef.close(false);
    }

    public confirm(): void 
    {
       this.dialogRef.close(true);
    }

    ngOnDestroy() 
    {
       this.renderer.removeClass(document.body, 'modal-open');
    }

}
