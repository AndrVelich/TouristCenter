import {
    Component,
    Inject,
    OnDestroy,
    Renderer2
} from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatSelectModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { OrderService, Order } from "@siteCommon/Services/order.service";

@Component({
    selector: "orderComponent",
    templateUrl: "order.component.html",
    styleUrls: ["order.component.css"],
    providers: [OrderService]
})
export class OrderComponent implements OnDestroy {
    public orderForm: FormGroup;
    public order: Order = new Order();
    public errorMessage: string;
    public showConfirmMessage: boolean = false;
    public isPreloaderInProgress: boolean = false;
    public mask: Array<any> = ['8', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

    constructor(
        public dialogRef: MatDialogRef<OrderComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private renderer: Renderer2,
        private fb: FormBuilder,
        private service: OrderService,
        private router: Router
    ) {
        this.renderer.addClass(document.body, 'modal-open');
    }

    ngOnInit() {
        this.buildForm();
        this.order.url = this.router.url;
        this.order.tourOrButton = this.data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'modal-open');
    }

    saveOrder() {
        if (this.orderForm.valid) {
            this.isPreloaderInProgress = true;
            this.service.addOrder(this.order)
                .subscribe(
                    () => {
                        this.showConfirmMessage = true;
                        this.isPreloaderInProgress = false;
                    },
                    error => this.errorMessage = error);

            //this.dialogRef.close()
        }
        else {
            this.validateAllFormFields(this.orderForm);
        }
    }

    private buildForm() {
        this.orderForm = this.fb.group({
            "name": [this.order.name, [
                Validators.required
            ]],
            "phone": [this.order.phone, [
                Validators.required,
                Validators.pattern('^[0-9() -]+$')
            ]],
            "description": [this.order.description]
        });
    }

    //TODO move to the service
    private validateAllFormFields(formGroup: FormGroup) {   
        Object.keys(formGroup.controls).forEach(field => {  
            const control = formGroup.get(field);           
            if (control instanceof FormControl) {           
                control.markAsDirty({ onlySelf: true });
            } else if (control instanceof FormGroup) {      
                this.validateAllFormFields(control);        
            }
        });
    }
}
