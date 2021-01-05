import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";

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
    filters: Array<{ key: string; value: string[] }>
  ): Observable<HttpResponse<any>> {
    let params = new HttpParams()
      .append('PageNumber', `${pageIndex}`)
      .append('PageSize', `${pageSize}`)
      .append('OrderBy', `${sortField}`)
      .append('SortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
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
  template: `<nz-input-group nzSearch nzSize="large">
  <input type="text" nz-input placeholder="input search text" />
    <button nz-button nzType="primary" nzSize="large" nzSearch>查询</button>     
    <button nz-button nzType="primary" nzSize="large" (click)="AddCustomer()">增加</button>
    <button nz-button nzType="primary" [disabled]="setOfCheckedId.size === 0" [nzLoading]="loading" nzSize="large">删除</button>    
    </nz-input-group>
  <nz-table
    nzSize="small"
    nzShowSizeChanger
    [nzData]="listOfRandomUser"
    [nzFrontPagination]="false"
    [nzLoading]="loading"
    [nzTotal]="total"
    [nzPageSize]="pageSize"
    [nzPageIndex]="pageIndex"
    (nzQueryParams)="onQueryParamsChange($event)"
  >
    <thead>
      <tr>
        <th
        [nzSelections]="listOfSelection"
        [(nzChecked)]="checked"
        [nzIndeterminate]="indeterminate"
        (nzCheckedChange)="onAllChecked($event)"></th>      
        <th nzColumnKey="Name" [nzSortFn]="true">姓名</th>
        <th nzColumnKey="Gender" [nzFilters]="filterGender" [nzFilterFn]="true">性别</th>
        <th nzColumnKey="UserName" [nzSortFn]="true">用户名</th>
        <th nzColumnKey="Password" [nzSortFn]="true">密码</th>
        <th nzColumnKey="PhoneNumber" [nzSortFn]="true">电话</th>
        <th nzColumnKey="Email" [nzSortFn]="true">Email</th>
        <th nzColumnKey="ContactNote" [nzSortFn]="true">联系渠道</th>
        <th nzColumnKey="Remark" [nzSortFn]="true">备注</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let data of listOfRandomUser">
        <td [nzChecked]="setOfCheckedId.has(data.id)" (nzCheckedChange)="onItemChecked(data.id, $event)"></td>
        <td>{{ data.name }}</td>
        <td>{{ data.gender }}</td>
        <td>{{ data.userName }}</td>
        <td>{{ data.password }}</td>
        <td>{{ data.phoneNumber }}</td>
        <td>{{ data.email }}</td>
        <td>{{ data.contactNote }}</td>
        <td>{{ data.remark }}</td>
        <td>
        <a (click)="ViewCustomer(data.id)">查看</a> |
        <a (click)="ModifyCustomer(data.id)">修改</a> |
        <a>删除</a>
        </td>
      </tr>
    </tbody>
  </nz-table>
`  ,
  styles: [
    `
      .ant-input {
        width: 300px;
        margin: 0 8px 8px 0;
      }
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
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
  public AddCustomer(): void {
    this.router.navigateByUrl("Customer/CustomerOpe/");
  }
  public ModifyCustomer(id): void {
    this.router.navigateByUrl("Customer/CustomerOpe/" + id);
  }
  public ViewCustomer(id): void {
    this.router.navigateByUrl("Customer/CustomerDetail/" + id);
  }
  
  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe( data => {
      this.loading = false;
      var json = JSON.parse(data.headers.get("x-pagination"));
      this.total = json.totalCount;
      this.listOfRandomUser = data.body;
      // console.log("listOfRandomUser");
      // console.log(this.listOfRandomUser);
      // console.log("ttttttttttttttttttt");
      // console.log(data.headers.get("x-pagination"));
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    //{ 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private randomUserService: RandomUserService, public router: Router,
    public activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
    //this.randomUserService.Test();
  }
}
