/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
/*define(['knockout', 'ojs/ojarraydataprovider', 'text!data/trans.json','ojs/ojknockout', 'ojs/ojchart'],
 function(ko, ArrayDataProvider, trans) {

    function IncidentsViewModel(){
      var self = this;
      var obj = JSON.parse(trans);
      var arr1 = [];
      var temp;
      var ms;
      var groupNames = ["4AM", "5AM", "6AM", "7AM", "8AM", "9AM","10AM", "11AM", "12PM"];
      self.groupNamesValue=ko.observableArray(groupNames);
      //alert(new Date("2019-06-24T19:55:00Z"));
      for (var i = 0; i < obj.length; i++) {
          for (var j =0 ; j < obj[i].transactions.length; j++) {
            ms = new Date(obj[i].transactions[j].transactionRequestDateTime);
            
            if((new Date("2019-06-26T00:56:00Z")-ms) < 21600000)
            {
              temp = new Object();
              temp.serviceType = obj[i].serviceType;
             temp.transactionRequestDateTime=ms.getUTCHours()+":"+ms.getMinutes();
             temp.count = obj[i].transactions[j].count;
              arr1.push(temp);
            }
          }
      }
      arr1=JSON.stringify(arr1);
      self.lineTypeValue = ko.observable('stepped');
      self.dataProvider = new ArrayDataProvider(JSON.parse(arr1), { keyAttributes: 'serviceType' });
  }
    return new IncidentsViewModel();
  }
);
