import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { detailedData } from './dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  newDataEvent!: detailedData;

  constructor(private http:HttpClient) { }
  private base_url:string='assets/data.json';
  getData(){
    return this.http.get(this.base_url);
  }

  addData(newData: detailedData){
    this.newDataEvent = newData;
  }
}
