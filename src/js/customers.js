/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['knockout','ojs/ojvalidation-base','text!data/trans.json', 'ojs/ojknockout', 'ojs/ojvalidation-datetime', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojlabel'],
 function(ko,validationBase,trans) {

    function CustomerViewModel(){
     

      this.orientationValue = ko.observable('vertical');
      this.lineTypeValue = ko.observable('stepped');
      this.timeAxisTypeValue = ko.observable('skipGaps');

      var obj = ko.observableArray([]);
      obj=JSON.parse(trans);
      var Object;
      var arr1=[];
      Date.prototype.addHours= function(h,m)
      {
          this.setHours(this.getHours()-h);
          this.setMinutes(this.getMinutes()-m);
          return this;
      }
     
  /*function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }*/
  //alert(formatAMPM(new Date(obj[0].transactions[0].transactionRequestDateTime)));
  //alert(new Date(obj[0].transactions[0].transactionRequestDateTime).addHours(5,30));
  //alert(new Date());
    /* for (var i = 0; i < obj.length; i++) 
    {
      
      for (var j =0 ; j < obj[i].transactions.length; j++) 
      {
         Object=
        {
            "name":"",
            "items":[{"x":"","y":0}]
        };
        var d = new Date(obj[i].transactions[j].transactionRequestDateTime);
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      if((new Date()-(new Date(utc))<=21600000))
      {    
        Object.name =obj[i].serviceType;
        Object.items[0].x =new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
        Object.items[0].y =obj[i].transactions[j].count;
        arr1.push(Object);
        }
      }
    }*/

      var flag =0;
       for(i = 0 ; i<obj.length; i++)
       {        
        arr1.push({name:obj[i].serviceType,items:[]});
        for(j=0;j<obj[i].transactions.length;j++)
        {

           var d = new Date(obj[i].transactions[j].transactionRequestDateTime);
           var utc = d.getTime() + (d.getTimezoneOffset() * 60000); 
            if(1)
            {
              if((new Date()-(new Date(utc))<=21600000))
              {
                arr1[i]["items"].push({x:new Date(d.getTime() + (d.getTimezoneOffset() * 60000)),y:obj[i].transactions[j].count});
              }
              flag =1;             
            }
           else
           {
                if(flag ==0)
                arr1[i]["items"].push({x:newDate(),y:0});
           }
                    
        }
      }
      alert(JSON.stringify(arr1));
      
      this.mixedSeriesValue = ko.observableArray(arr1);
         
      }
      
      return new CustomerViewModel();
  }
);
