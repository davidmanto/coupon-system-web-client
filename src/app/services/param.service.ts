import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamService {

  constructor() { }

  private paramData = {};

  public setParam(name: string, value: any){
    this.paramData[name] = value;
  }

  public getParamData(){
    // let tempData = this.paramData;
    // this.paramData = {};
    return this.paramData;
  }

}
