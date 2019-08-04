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
     /* Date.prototype.addHours= function(h,m)
      {
          this.setHours(this.getHours()-h);
          this.setMinutes(this.getMinutes()-m);
          return this;
      }*/
      var transPresent=0;
       for(var i = 0 ; i< obj.length; i++)
       {        
        arr1.push({name:obj[i].serviceType,items:[]});
        for(var j=0; j<obj[i].transactions.length;j++)
        {

           var transdate = new Date(obj[i].transactions[j].transactionRequestDateTime);
           var utc = transdate.getTime() + (transdate.getTimezoneOffset() * 60000);
         //  alert(new Date().toDateString());
          // alert(new Date(utc).toDateString());
           //alert(new Date().toDateString() == new Date(utc).toDateString()); 
           if(new Date().toDateString() == new Date(utc).toDateString())
           {
              
             if((new Date()-(new Date(utc))<=21600000) && (new Date()-(new Date(utc))>=0))   //2600000 is 6 hours interms of milliseconds
              {
                arr1[i]["items"].push({x:new Date(utc),y:obj[i].transactions[j].count});
              } 
              transPresent=1;           
          } 
          else
          {
              if(transPresent==0)
              {
                arr1[i]["items"].push({x:new Date(),y:""});
              }
          }
      }     
      }
      this.mixedSeriesValue = ko.observableArray(arr1);
    }
      
      return new CustomerViewModel();
  }
);
