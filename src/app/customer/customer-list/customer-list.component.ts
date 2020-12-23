import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';

interface RandomUser {
  id: number;  
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http.get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params });
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'app-customer-list',  
  template: `<nz-input-group nzSearch nzSize="large">
  <input type="text" nz-input placeholder="input search text" />
    <button nz-button nzType="primary" nzSize="large" nzSearch>查询</button>     
    <button nz-button nzType="primary" nzSize="large">增加</button>
    <button nz-button nzType="primary" [disabled]="setOfCheckedId.size === 0" [nzLoading]="loading" nzSize="large">删除</button>    
    </nz-input-group>
  <nz-table
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
        <th nzColumnKey="name" [nzSortFn]="true">Name</th>
        <th nzColumnKey="gender" [nzFilters]="filterGender" [nzFilterFn]="true">Gender</th>
        <th nzColumnKey="email" [nzSortFn]="true">Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let data of listOfRandomUser">
        <td [nzChecked]="setOfCheckedId.has(data.id)" (nzCheckedChange)="onItemChecked(data.id, $event)"></td>
        <td>{{ data.name.first }} {{ data.name.last }}</td>
        <td>{{ data.gender }}</td>
        <td>{{ data.email }}</td>
        <td>
        <a>修改</a> |
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
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
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
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onItemChecked(id: number, checked: boolean): void {
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

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
      this.loading = false;
      this.total = 200; // mock the total data here
      this.listOfRandomUser = data.results;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private randomUserService: RandomUserService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }
}
