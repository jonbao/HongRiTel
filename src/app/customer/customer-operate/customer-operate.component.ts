import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute, Router} from "@angular/router";
import { CustomerService } from "../customer.service";

// @Component({
//   selector: 'app-customer-operate',
//   templateUrl: './customer-operate.component.html',
//   styleUrls: ['./customer-operate.component.scss']
// })
@Component({
  selector: 'app-customer-operate',
  template: `
    <h2><span>客户信息管理</span></h2><br>
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm(validateForm.value)">
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>姓名</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback nzErrorTip="请输入姓名!">
        <input nz-input formControlName="Name" [(ngModel)]="customer.name" />
      </nz-form-control>
    </nz-form-item>    
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>用户名称</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback nzErrorTip="请输入用户名!">
        <input nz-input formControlName="UserName" [(ngModel)]="customer.userName" />
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>密码</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback nzErrorTip="请输入密码!">
        <input nz-input formControlName="Password" [(ngModel)]="customer.password" />
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">电话</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback nzErrorTip="请输入电话!">
        <input nz-input formControlName="PhoneNumber" [(ngModel)]="customer.phoneNumber" />
      </nz-form-control>
    </nz-form-item>    
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>Email</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback [nzErrorTip]="emailErrorTpl">
        <input nz-input formControlName="Email" placeholder="email" type="email" [(ngModel)]="customer.email" />
        <ng-template #emailErrorTpl let-control>
          <ng-container *ngIf="control.hasError('email')">
            The input is not valid E-mail!
          </ng-container>
          <ng-container *ngIf="control.hasError('required')">
            Please input your E-mail!
          </ng-container>
        </ng-template>
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">联系渠道</nz-form-label>
      <nz-form-control [nzSpan]="15" nzErrorTip="Please write something here!">
        <textarea formControlName="ContactNote" nz-input rows="3" placeholder="请输入联系渠道！" [(ngModel)]="customer.contactNote"></textarea>
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">备注</nz-form-label>
      <nz-form-control [nzSpan]="15" nzErrorTip="Please write something here!">
        <textarea formControlName="Remark" nz-input rows="3" placeholder="请输入备注！" [(ngModel)]="customer.remark"></textarea>
      </nz-form-control>
    </nz-form-item>    
    <nz-form-item>
      <nz-form-control [nzOffset]="7" [nzSpan]="15">
        <button nz-button nzType="primary" nzSize="large" [disabled]="!validateForm.valid">Submit</button>
        <button type="button" nz-button nzSize="large" (click)="Cancel()">Cancel</button>
      </nz-form-control>
    </nz-form-item>
  </form>
  `,
  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }      
    `
  ]
})
export class CustomerOperateComponent implements OnInit {
  validateForm: FormGroup;
  public customer: any = {};

  // current locale is key of the nzAutoTips
  // if it is not found, it will be searched again with `default`
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email'
    }
  };

  submitForm(value: {Name: string; UserName: string; email: string; Password: string; comment: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    //console.log(value);
    if((this.customer.id=="") || (this.customer.id==undefined)){
      this.postCustomer(this.customer);
    }
    else{
      this.putCustomer(this.customer);
    }
  }
  constructor(
    public customerDetailService:CustomerService,
    public activeRoute: ActivatedRoute,
    private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      Name: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      Email: ['', [Validators.email, Validators.required]],
      Password: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.maxLength(200)]],
      ContactNote: ['', [Validators.maxLength(200)]],
      Remark: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    var id:string;
    this.activeRoute.paramMap.subscribe(params => {
      //console.log("id123",params.get('id'));
      id = params.get('id');
    });
    //this.activeRoute.params.subscribe(
    //  params => this.getCustomer(id)
    //);
    if((id!="") && (id!=undefined)){
      this.getCustomer(id);
    }
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
  public postCustomer(data) {
    this.customerDetailService
      .postCustomer(data)
      .subscribe(
        data => this.customer = data,
        error => console.error(error)
      );
  }
  public putCustomer(data) {
    this.customerDetailService
      .putCustomer(data)
      .subscribe(
        data => this.customer = data,
        error => console.error(error)
      );
  }
}


// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
