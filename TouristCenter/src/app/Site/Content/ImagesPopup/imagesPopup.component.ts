import {
    Component,
    Inject,
    OnDestroy,
    Renderer2
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatSelectModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: "imagesPopupComponent",
    templateUrl: "imagesPopup.component.html",
    styleUrls: ["imagesPopup.component.css"]
})
export class ImagesPopupComponent implements OnDestroy {

    constructor(
      public dialogRef: MatDialogRef<ImagesPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private renderer: Renderer2
      )
    {
      this.renderer.addClass(document.body, 'modal-open');
    }

    ngOnInit() {
        
    }
 
    onNoClick(): void {
       this.dialogRef.close();
    }

    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'modal-open');
    }
}
