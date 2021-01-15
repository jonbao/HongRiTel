
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute, Router} from "@angular/router";
import { ProductService } from "../product.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-operate',
  templateUrl: "./product-operate.component.html",
  styleUrls: ["./product-operate.component.scss"]
})
export class ProductOperateComponent implements OnInit {
  validateForm: FormGroup;
  public product: any = {};

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
    if((this.product.id=="") || (this.product.id==undefined)){
      this.postProduct(this.product);
    }
    else{
      this.putProduct(this.product);
    }
  }
  constructor(
    private message: NzMessageService,
    public productDetailService:ProductService,
    public activeRoute: ActivatedRoute,
    private fb: FormBuilder) {
    this.validateForm = this.fb.group({

          Category: ['', [Validators.required,Validators.maxLength(200)]],
          ProductID: ['', [Validators.maxLength(200)]],
          Password: ['', [Validators.maxLength(200)]],
          SalePrice: ['', []],
          BasePrice: ['', []],
          MoneyType: ['', [Validators.maxLength(200)]],
          Remark: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    var id:string;
    this.activeRoute.paramMap.subscribe(params => {
      //console.log("id123",params.get('id'));
      id = params.get('id');
    });
    //this.activeRoute.params.subscribe(
    //  params => this.getProduct(id)
    //);
    if((id!="") && (id!=undefined)){
      this.getProduct(id);
    }
  }
  public Cancel(): void {
    window.history.back();
  }
  public getProduct(id) {
    this.productDetailService
      .getProduct(id)
      .subscribe(
        data => this.product = data,
        error => console.error(error)
      );
  }
  public postProduct(data) {
    this.productDetailService
      .postProduct(data)
      .subscribe(
        data => {
          this.product = data;
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
  public putProduct(data) {
    this.productDetailService
      .putProduct(data)
      .subscribe(
        data => {
          this.product = data;
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
  return typeof value === 'string' && /("1\d{10}$)/.test(value);
}


