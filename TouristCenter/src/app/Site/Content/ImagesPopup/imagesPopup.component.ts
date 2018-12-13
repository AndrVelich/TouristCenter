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
    selector: "imagesPopupComponent",
    templateUrl: "imagesPopup.component.html",
    styleUrls: ["imagesPopup.component.css"]
})
export class ImagesPopupComponent implements OnDestroy {
    private index: number;

    constructor(
      public dialogRef: MatDialogRef<ImagesPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Array<number>,
      private renderer: Renderer2
      )
    {
        this.renderer.addClass(document.body, 'modal-open');
    }

    ngOnInit() 
    {
        this.index = 0;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == 'ArrowRight') {
            this.toNext()
        }
        if (event.key == 'ArrowLeft') {
            this.toPrevious()
        }
    }

    public toPrevious() : void
    {
        if(this.isPreviousAvailable())
        {
            --this.index;
        }
    }

    public toNext() : void
    {
        if (this.isNextAvailable()) {
            ++this.index;
        }
        else {
            this.index = 0;
        }
    }

    public isNextAvailable() : boolean
    {
        var result = this.index < this.data.length - 1;
        return result;
    }

    public isPreviousAvailable() : boolean
    {
        var result = this.index > 0;
        return result;
    }

    public getImagePath() : string
    {
        var result = '/api/image/' + this.data[this.index];
        return result;
    }
 
    onNoClick(): void 
    {
       this.dialogRef.close();
    }

    ngOnDestroy() 
    {
       this.renderer.removeClass(document.body, 'modal-open');
    }

}
