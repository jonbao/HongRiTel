
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ExchangeRateService {
    public exchangerateListURL = "http://localhost:1234/api/exchangerates";

    constructor(public httpClient: HttpClient) {
    }

    public getExchangeRate(id): Observable<any> {
        return this.httpClient.get(this.exchangerateListURL+"/"+id);
    }

    public getPostList(): Observable<any> {
        return this.httpClient.get(this.exchangerateListURL);
    }

    public getPostNumber(): number {
        return 0;
    }

    public postExchangeRate(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }        
        return this.httpClient.post(this.exchangerateListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public putExchangeRate(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.httpClient.put(this.exchangerateListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public deleteExchangeRate(id): Observable<any> {
        return this.httpClient.delete(this.exchangerateListURL+"/"+id);
    }
    public deleteExchangeRates(ids): Observable<any> {
        return this.httpClient.delete(this.exchangerateListURL+"/"+ids);
    }
    public async deleteExchangeRatesAsync(ids): Promise<Observable<any>> {
        return await this.httpClient.delete(this.exchangerateListURL+"/"+ids);
    }
    
    public search() {

    }
}

