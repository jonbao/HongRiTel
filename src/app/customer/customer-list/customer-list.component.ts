import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "../customer.service";

// interface SearchItem{
//   keyword:string
// }
// interface RandomUser {
//   id: string;  
//   name: string;  
//   gender: string;
//   userName: string;//用户名 
//   password: string;//密码 
//   phoneNumber: string;//电话 
//   email: string;//Email
//   contactNote: string;// 联系渠道 
//   remark: string;//备注 
// }

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';
  CustomerUrl = 'http://localhost:1234/api/customers';

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string|"",
    sortOrder: string|"",
    searchKeyWord: string|"",
    filters: Array<{ key: string; value: string[] }>
  ): Observable<HttpResponse<any>> {
    let params = new HttpParams()
      .append('PageNumber', `${pageIndex}`)
      .append('PageSize', `${pageSize}`)
      .append('OrderBy', `${sortField}`)
      .append('SortOrder', `${sortOrder}`)
      .append('SearchKeyWord', `${searchKeyWord}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    console.log("params",params);
    return this.http.get(`${this.CustomerUrl}`, { params, observe: 'response'});
  }
  Test(){

    this.http.get(this.CustomerUrl,{
      params: {
        count: String(1)
      },
      observe: 'response'
    }).subscribe(  (data: HttpResponse<any>) => {
      console.log("data.headers123");
      console.log(data);
      console.log(data.headers.get("x-pagination"));
    });

    // this.http.get(this.CustomerUrl,{observe: 'response'}).subscribe(  (data: HttpResponse<any>) => {
    //     console.log("data.headers123");
    //     console.log(data);
    //     console.log(data.headers.get("x-pagination"));
    // });

  }
  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'app-customer-list',  
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  //public customerList: Array<any>;
  total = 1;
  listOfRandomUser: Array<any>;//: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  searchKeyWord = "";
  NameSortOrder = "";
  UserNameSortOrder = "";
  firstRun = true;
  setOfCheckedId = new Set<string>();
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfRandomUser.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfRandomUser.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];  
  onAllChecked(value: boolean): void {
    this.listOfRandomUser.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfRandomUser.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfRandomUser.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  public SearchCustomer(): void {
    this.pageIndex = 1;
    this.NameSortOrder = null;
    this.UserNameSortOrder = null;
    localStorage.removeItem("searchKeyWord");
    localStorage.removeItem("pageIndex");
    localStorage.removeItem("pageSize");
    localStorage.removeItem("sortField");
    localStorage.removeItem("sortOrder");    
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, this.searchKeyWord, []);
  }
  public AddCustomer(): void {
    this.router.navigateByUrl("Customer/CustomerOpe/");
  }
  public ModifyCustomer(id): void {
    this.router.navigateByUrl("Customer/CustomerOpe/" + id);
  }
  public ViewCustomer(id): void {
    this.router.navigateByUrl("Customer/CustomerDetail/" + id);
  }
  public deleteRow(id): void {
    this.listOfRandomUser = this.listOfRandomUser.filter(d => d.id !== id);
    this.deleteCustomer(id);
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, this.searchKeyWord, []);
  }
  public DeleteCustomers(): void {
    this.deleteCustomers();
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, this.searchKeyWord, []);    
  }
  public ConvertToStrs()
  {
    var str = "(^";
    this.setOfCheckedId.forEach(element => {
      str += "," + element;
    });
    return str.replace("^,","")+")";
  }
  public deleteCustomers() {
    var ids = this.ConvertToStrs();
    this.customerDetailService
      .deleteCustomers(ids)
      .subscribe(
        //data => this.customer = data,
        //error => console.error(error)
      );
  }  
  public deleteCustomer(id) {
    this.customerDetailService
      .deleteCustomer(id)
      .subscribe(
        //data => this.customer = data,
        //error => console.error(error)
      );
  }  
  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    searchKeyWord: string | null, 
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder,searchKeyWord, filter).subscribe( data => {
      this.loading = false;
      var json = JSON.parse(data.headers.get("x-pagination"));
      this.total = json.totalCount;
      this.listOfRandomUser = data.body;
      localStorage.setItem("searchKeyWord",searchKeyWord);
      localStorage.setItem("pageIndex",pageIndex.toString());
      localStorage.setItem("pageSize",pageSize.toString());
      localStorage.setItem("sortField",sortField);
      localStorage.setItem("sortOrder",sortOrder);
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log("inininin");
    if(this.firstRun)
    {
      this.firstRun = false;
      return;
    }
    console.log("runrunrun");
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => (item.value !== null) && (item.value !== ""));
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    //{ 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, this.searchKeyWord, filter);
    this.pageIndex = pageIndex; 
    console.log("params11111",params);
    console.log("onQueryParamsChange");
  }

  constructor(public customerDetailService:CustomerService, private randomUserService: RandomUserService, public router: Router,
    public activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    //this.randomUserService.Test();
    this.searchKeyWord = localStorage.getItem('searchKeyWord');
    console.log("localStorage.getItem('pageIndex')",localStorage.getItem('pageIndex'));
    if(Number(localStorage.getItem('pageIndex')) != 0){
      this.pageIndex = Number(localStorage.getItem('pageIndex'));
    }
    if(Number(localStorage.getItem('pageSize')) != 0){
      this.pageSize = Number(localStorage.getItem('pageSize'));
    }
    if(localStorage.getItem('sortField') == "UserName"){
      this.UserNameSortOrder = localStorage.getItem('sortOrder');
    }
    if(localStorage.getItem('sortField') == "Name"){
      this.NameSortOrder = localStorage.getItem('sortOrder');
    }        
    console.log("ngOnInit");
    console.log("localStorage.getItem('sortField')",localStorage.getItem('sortField'));
    console.log("localStorage.getItem('sortOrder')",localStorage.getItem('sortOrder'));

    this.loadDataFromServer(this.pageIndex, this.pageSize, localStorage.getItem('sortField'), localStorage.getItem('sortOrder'), this.searchKeyWord, []);
  }
}
