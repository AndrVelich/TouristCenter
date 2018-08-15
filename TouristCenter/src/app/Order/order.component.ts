import {
    Component,
    Inject,
    OnDestroy,
    Renderer2
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatSelectModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dictionary } from "../Common/Dictionary";
import { Order } from "./order";
import { OrderService } from "./order.service";

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
    public mask: Array<any> = ['8','(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

    constructor(
      public dialogRef: MatDialogRef<OrderComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private renderer: Renderer2,
      private fb: FormBuilder,
      private service: OrderService
      )
    {
      this.renderer.addClass(document.body, 'modal-open');
    }

    ngOnInit() {
        this.buildForm();
    }
 
    onNoClick(): void {
       this.dialogRef.close();
    }

    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'modal-open');
    }

    saveOrder(){
      this.service.addOrder(this.order)
      //TODO need notifcation
      .subscribe(() => {},
            error => this.errorMessage = error);
      this.dialogRef.close()
    }

    private buildForm() {
        this.orderForm = this.fb.group({
            "name": [this.order.name, [
                Validators.required
            ]],
            "phone": [this.order.phone, [
                Validators.required
            ]],
            "description": [this.order.description]
        });
    }
}
