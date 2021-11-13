import { Component } from '@angular/core';
import { Airtable} from 'ngx-airtable';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public display:any;
  public propertyName:string = "";
  public propertySize:string = "";
  public base:any;
  public propertyDescription:string = "";
  public records:any[] = [];
  public datas:Object = 
  {
    
  };
  public restData:any = [];
  public properties = 
  [
    {name:"property one",description:"property one description",size:"property one size"},
    {name:"property two",description:"property two description",size:"property two size"},
    {name:"property three",description:"property three description",size:"property three size"},
    {name:"property four",description:"property four description",size:"property one four"},
    {name:"property five",description:"property five description",size:"property one five"},
  ];

  constructor(private airtable:Airtable){
    this.initAirtable();
  }

  public table:any;


  addProperty(){
    if(this.propertyName.length == 0 || this.propertyDescription.length == 0 || this.propertySize.length == 0)
    {
      alert("enter all properties");
    }
    else
    {
      var data = 
      `{
        "records": [
          {
            "fields": {
              "name":"${this.propertyName}","description":"${this.propertyDescription}","size":"${this.propertySize}"
            }
          }
        ]
      }`;
      var headers = new HttpHeaders({ "Authorization":"Bearer key7bpzhhjmpHhaYU", "Content-Type":"application/json" });
      this.airtable.http.post("https://api.airtable.com/v0/appe6i4liI7BXy8BZ/propertiestable",data,{ headers:headers }).subscribe((res) => { console.log(res); });
      this.airtable.http.get("https://api.airtable.com/v0/appe6i4liI7BXy8BZ/propertiestable",{ headers:headers }).subscribe((res:any) => {
      this.restData = [];
      for(let i=0; i<res["records"].length; i++){
        this.restData[i] = res["records"][i]["fields"];
      }
    })
    }
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  removeProperty(){
    if(this.properties.length != 0){
      this.properties.pop();
    }
    else{
      alert("nothing in the list");
    }
  }

  private initAirtable(): void {
    this.airtable.configure({ apiKey:"key7bpzhhjmpHhaYU",endpointUrl:"https://api.airtable.com" });
    var headers = new HttpHeaders({ "Authorization":"Bearer key7bpzhhjmpHhaYU", "Content-Type":"application/json" });
    var recordstobepushed;
    for(let i=0;i < this.properties.length; i++){
       this.records[i] = {"fields":this.properties[i]};    
    }
    recordstobepushed = 
    {
      "records":this.records
    };
    this.airtable.http.post("https://api.airtable.com/v0/appe6i4liI7BXy8BZ/propertiestable",recordstobepushed,{ headers:headers }).subscribe((res) => { console.log(res); });
    this.airtable.http.get("https://api.airtable.com/v0/appe6i4liI7BXy8BZ/propertiestable",{ headers:headers }).subscribe((res:any) => {
      for(let i=0; i<res["records"].length; i++){
        this.restData[i] = res["records"][i]["fields"];
      }
    })
  }
}