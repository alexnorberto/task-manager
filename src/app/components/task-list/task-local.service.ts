import { Injectable } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskLocalService {

  taskList;

  constructor(private webRequestService: WebRequestService) { }

  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

}
