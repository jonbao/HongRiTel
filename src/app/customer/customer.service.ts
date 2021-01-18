import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GlobalVariable } from '../../global';

@Injectable()
export class CustomerService {
    public customerListURL = GlobalVariable.BASE_API_URL + "api/customers";

    constructor(public httpClient: HttpClient) {
    }

    public getCustomer(id): Observable<any> {
        return this.httpClient.get(this.customerListURL+"/"+id);
    }

    public getPostList(): Observable<any> {
        return this.httpClient.get(this.customerListURL);
    }

    public getPostNumber(): number {
        return 0;
    }

    public postCustomer(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }        
        return this.httpClient.post(this.customerListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public putCustomer(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.httpClient.put(this.customerListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public deleteCustomer(id): Observable<any> {
        return this.httpClient.delete(this.customerListURL+"/"+id);
    }
    public deleteCustomers(ids): Observable<any> {
        return this.httpClient.delete(this.customerListURL+"/"+ids);
    }
    public async deleteCustomersAsync(ids): Promise<Observable<any>> {
        return await this.httpClient.delete(this.customerListURL+"/"+ids);
    }
    
    public search() {

    }
}
