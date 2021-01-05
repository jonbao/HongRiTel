import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn,ValidationErrors, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';
import { CustomerService } from "../customer.service";
import { ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
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


