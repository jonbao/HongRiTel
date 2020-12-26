import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';

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
        啊手动阀手sddsdfsdfdsf动阀手动sadfasdfasdfasdfasddddddddddddddddasdfddddddddasdfasdfasdfasdfasdfadsfasdfasdfasdfasdfasdfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
      </nz-form-control>
    </nz-form-item>    
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>用户名称</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback>
        sadfasdfasdfads 
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>密码</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback>
        的撒发大水发射点发
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">电话</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback >
        dsfasdfasdf
      </nz-form-control>
    </nz-form-item>    
    <nz-form-item>
      <nz-form-label [nzSpan]="7" nzRequired>Email</nz-form-label>
      <nz-form-control [nzSpan]="15" nzHasFeedback>
        撒旦发射点发射点发的
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">联系渠道</nz-form-label>
      <nz-form-control [nzSpan]="15">
        asdfasdfadsf
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSpan]="7">备注</nz-form-label>
      <nz-form-control [nzSpan]="15">
        asdfasdfasdf
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

  constructor(private fb: FormBuilder) {

    
  }

  ngOnInit(): void {
  }

  public Cancel(): void {
    window.history.back();
  }
}


