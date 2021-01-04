import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { CustomerService } from "../customer.service";
import { ActivatedRoute, Router} from "@angular/router";

// @Component({
//   selector: 'app-customer-operate',
//   templateUrl: './customer-operate.component.html',
//   styleUrls: ['./customer-operate.component.scss']
// })
@Component({
  selector: 'app-customer-detail',
  template: `
    <h2><span>客户信息管理</span></h2><br>
    <form nz-form>
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>姓名</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
      {{ customer.name }}
      </nz-form-control>
    </nz-form-item>    
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>用户名称</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback>
      {{ customer.userName }} 
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>密码</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback>
      {{ customer.password }}
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">电话</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback >
      {{ customer.phoneNumber }}
      </nz-form-control>
    </nz-form-item>    
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>Email</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback>
      {{ customer.email }}
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">联系渠道</nz-form-label>
      <nz-form-control [nzSpan]="15">
      {{ customer.contactNote }}
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">备注</nz-form-label>
      <nz-form-control [nzSpan]="15">
      {{ customer.remark }}
      </nz-form-control>
    </nz-form-item>    
    <nz-form-item>
      <nz-form-control [nzOffset]="7" [nzSpan]="15">
        <button nz-button nzType="primary" nzSize="large"(click)="Cancel()">Cancel</button>
      </nz-form-control>
    </nz-form-item>
  </form>
  `,
  styles: [
    `
      [nz-form] {
        max-width: 800px;
      }
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }     
    `
  ]
})
export class CustomerDetailComponent implements OnInit {
  public customer: any = {};
  constructor(public customerDetailService:CustomerService, 
    public router: Router,
    public activeRoute: ActivatedRoute,
    private fb: FormBuilder) {
    //constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    var id:string;
    this.activeRoute.paramMap.subscribe(params => {
      //console.log("id123",params.get('id'));
      id = params.get('id');
    });
    this.activeRoute.params.subscribe(
      params => this.getCustomer(id)
    );
  }

  public Cancel(): void {
    window.history.back();
  }
  public getCustomer(id) {
    this.customerDetailService
      .getCustomer(id)
      .subscribe(
        data => this.customer = data,
        error => console.error(error)
      );
  }
}


