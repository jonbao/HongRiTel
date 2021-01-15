
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class SystemDictionaryService {
    public systemdictionaryListURL = "http://localhost:1234/api/systemdictionarys";

    constructor(public httpClient: HttpClient) {
    }

    public getSystemDictionary(id): Observable<any> {
        return this.httpClient.get(this.systemdictionaryListURL+"/"+id);
    }

    public getPostList(): Observable<any> {
        return this.httpClient.get(this.systemdictionaryListURL);
    }

    public getPostNumber(): number {
        return 0;
    }

    public postSystemDictionary(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }        
        return this.httpClient.post(this.systemdictionaryListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public putSystemDictionary(data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.httpClient.put(this.systemdictionaryListURL,
            JSON.stringify(data),
            httpOptions);
    }
    public deleteSystemDictionary(id): Observable<any> {
        return this.httpClient.delete(this.systemdictionaryListURL+"/"+id);
    }
    public deleteSystemDictionarys(ids): Observable<any> {
        return this.httpClient.delete(this.systemdictionaryListURL+"/"+ids);
    }
    public async deleteSystemDictionarysAsync(ids): Promise<Observable<any>> {
        return await this.httpClient.delete(this.systemdictionaryListURL+"/"+ids);
    }
    
    public search() {

    }
}

