import { PaymentDetail } from './../../shared/payment-detail.model';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(private service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: PaymentDetail) {
    this.service.formData = Object.assign({}, pd);
  }

  onUpdate(pd) {
    for (let i = 0; i < this.service.list.length; i++) {
      if (this.service.list[i].pmId == pd.pmId)
      {
        this.service.list[i].isEditable = !this.service.list[i].isEditable;

        if(!this.service.list[i].isEditable){ // done editing, then send update rqs
          this.service.updatePaymentDetail(this.service.list[i]);
        }
      }
    }
  }

  onDelete(pmId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deletePaymentDetail(pmId)
        .subscribe(res => {
          debugger;
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }

}
