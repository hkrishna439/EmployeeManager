/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['knockout', 'ojs/ojarraydataprovider', 'text!data/trans.json','ojs/ojknockout', 
'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojchart'],
 function(ko, ArrayDataProvider, trans) {

    function IncidentsViewModel(){
      var self = this;
    
      
      var obj = JSON.parse(trans);
      /*var arr=[];

      for(var i=0;i<obj.length;i++)
      {
        arr.push({"serviceType":obj[i].serviceType});
      }
      arr=JSON.stringify(arr);
      alert(arr); */
      var arr1 = []
      var temp;
      let ms;
      for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < obj[i].transactions.length; j++) {
              temp = new Object();
              temp.serviceType=obj[i].serviceType;
             // temp.transactionRequestDateTime = obj[i].transactions[j].transactionRequestDateTime;
             ms = new Date(obj[i].transactions[j].transactionRequestDateTime);
             temp.transactionRequestDateTime=ms.getUTCHours()+":"+ms.getMinutes();
             temp.count = obj[i].transactions[j].count;
              arr1.push(temp);
          }
      }
      arr1=JSON.stringify(arr1);
      alert(arr1);
      self.dataProvider = new ArrayDataProvider(JSON.parse(arr1), { keyAttributes: 'serviceType' });

      /*for(var i=0;i<obj.length;i++)
      {
        for(var j=0;j<obj[i].transactions.length;j++)
        {
            // alert(obj[i].transactions[j].count);
        }

      }*/
     

     
    
    
  }
  

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
