import { LightningElement, track, api } from "lwc";
import recordsFetch from "@salesforce/apex/getRecords.recordsFetch";

export default class DisplayRecords extends LightningElement {
  @track fieldsSelected = [];
  @track gotTheRecords = false;
  @track recordsFet = [];
  @track recordsF = [];
  @track labelValue = [];
  @track columnsData = [];
  @track arrtoSend = [];
  //@track isShow = false;
  @track columnsName = [];

  @track val;

  @api selectedFields;
  @api selectedFinalField;
  @api
  getSelectedFields(field) {
    // this.columnObj  = columnObj;
    // this.abc = str;
    //this.isShow = false;
    // this.fieldsSelected.push({
    //c/fieldsSelection  fieldName: field,
    //label: field
    // })
    
    
    this.fieldsSelected = [];
    console.log('old field array -->', JSON.stringify(this.fieldsSelected))
    this.fieldsSelected = field;
    console.log('new field array -->', JSON.stringify(this.fieldsSelected))
    console.log('Fields '+ field);
    console.log('Fields '+ JSON.stringify(field));
    // eslint-disable-next-line guard-for-in
    

  }

  @track selectObject='';
  @api
    getRecord(objecName) {
      this.selectObject = objecName;
     console.log(objecName);
    
    recordsFetch({objname:objecName,fields:this.fieldsSelected}).then(result => {
        if (result) {
            this.arrtoSend = [];
            // eslint-disable-next-line guard-for-in
            for(let index in this.fieldsSelected){
                this.arrtoSend.push(this.fieldsSelected[index])
            }
            this.val = this.arrtoSend;
            console.log('val'+this.val);
          // console.log(JSON.stringify(field));
          this.columnsName = [];
          console.log('before=>',JSON.stringify(this.columnsName));
           this.columnsName = this.val.map((value, index) => ({
            label: this.val[index],
            fieldName: value
        }))
        console.log('after=>',JSON.stringify(this.columnsName));
            this.gotTheRecords = true;
           
            //this.recordsFet = [];
            this.recordsFet = result;
            console.log('RESULT '+result);
            console.log("tttttttttt "+JSON.stringify(this.recordsFet))
           

        } else {
            console.log('error occurred');
        }
    })
    .catch(error => {
        console.log('Error on record method: ' + error.message);
    });

}
// get columnsDatas() {
//     return this.columnsData.filter(column => this.fieldsSelected.includes(column.fieldName));
// }
// get recordData(){
//     return this.recordsFet.map(records => {
//         const row = {};
//         this.fieldsSelected.forEach(field => {
//             row[field] = records[field.label];
//         });
//         return row;
//     });
// }



//   @api
//   getRecords(objectName) {
//     this.selectObject = objectName;
//     console.log(objectName);
//   }
//   @track recordsFetched = [];
//   @wire(recordsFetch, { objname: "$selectObject", fields: "$fieldsSelected" })
//   records({ data, error }) {
//     if (data) {
//       console.log("In Records Fetched");
//       this.recordsFetched = [];
//       this.recordsFetched = data;
//       // eslint-disable-next-line guard-for-in
//       //for(let record in data){
//       //   this.recordsFetched.push({label:record,value:record});}
//       console.log('Filed madhe ahe' + this.fieldsSelected);
//       this.labelValue = this.fieldsSelected;
//       this.columnsName = this.fieldsSelected.map((value, index) => ({
//         label: this.labelValue[index],
//         fieldname: value
//       }))
//       this.columnsData = this.columnsName;

      
//       //let fettched = this.recordsFetched ;
//       //this.recordsFet = fettched.map((_, index) => {
//       //   return {data};
//       // });
//       console.log(data);
//       console.log(JSON.stringify(data));
//       // this.columnsName=({fieldName:data,label:data})
//     } else if (error) {
//       console.log(error);
//       console.log("In get Record Error");
//     }
//   }
  
}
