import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute, Router} from "@angular/router";
import { CustomerService } from "../customer.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-customer-operate',
  templateUrl: "./customer-operate.component.html",
  styleUrls: ["./customer-operate.component.scss"]
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
    private message: NzMessageService,
    public customerDetailService:CustomerService,
    public activeRoute: ActivatedRoute,
    private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      Name: ['', [Validators.required]],
      Gender: ['', [Validators.maxLength(10)]],
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
        data => {
          this.customer = data;
          this.createMessage('success','添加成功。');
          window.history.back();
        },
        error => {
          this.createMessage('error','添加失败。');
          console.error(error);
        }
      );
  }
  public createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
  public putCustomer(data) {
    this.customerDetailService
      .putCustomer(data)
      .subscribe(
        data => {
          this.customer = data;
          this.createMessage('success','修改成功。');
          window.history.back();
        },
        error =>{ 
          this.createMessage('error','修改失败。');
          console.error(error);
        }
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
