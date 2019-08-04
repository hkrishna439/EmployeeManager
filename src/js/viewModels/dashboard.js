/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout','ojs/ojarraydataprovider', 'jquery','ojs/ojknockout', 'ojs/ojinputtext', 
'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojvalidationgroup','ojs/ojnavigationlist','ojs/ojswitcher','ojs/ojdefer','ojs/ojmodule'],
 function(ko,ArrayDataProvider,$) {

    function DashboardViewModel() {
      var self = this;
      self.selectedItem = ko.observable("home");

      var deptArray = [
        {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
        {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 40, DepartmentName: 'Human Resources', LocationId: 200, ManagerId: 300},
        {DepartmentId: 50, DepartmentName: 'Accounting', LocationId: 200, ManagerId: 300},
        {DepartmentId: 60, DepartmentName: 'Operations', LocationId: 200, ManagerId: 300},
        {DepartmentId: 70, DepartmentName: 'Engineering', LocationId: 200, ManagerId: 300},
        {DepartmentId: 80, DepartmentName: 'Production', LocationId: 200, ManagerId: 300},
        {DepartmentId: 90, DepartmentName: 'Sales', LocationId: 200, ManagerId: 300},
        {DepartmentId: 100, DepartmentName: 'Customer Service', LocationId: 200, ManagerId: 300}];
    this.deptObservableArray = ko.observableArray(deptArray);
    this.dataprovider = new ArrayDataProvider(this.deptObservableArray, {keyAttributes: '@index'});
    this.groupValid = ko.observable();
    
    //add to the observableArray
    this.addRow = function()
    {
        if (this.groupValid() == "invalidShown") {
            return;
        }
        var dept = {
                     'DepartmentId': this.inputDepartmentId(),
                     'DepartmentName': this.inputDepartmentName(),
                     'LocationId': this.inputLocationId(),
                     'ManagerId': this.inputManagerId()
                  };
        this.deptObservableArray.push(dept);
    }.bind(this);
    
    //used to update the fields based on the selected row
    this.updateRow = function()
    {   
        if (this.groupValid() == "invalidShown") {
            return;
        }
        var element = document.getElementById('table');
        var currentRow = element.currentRow;
        
        if (currentRow != null)
        {
            this.deptObservableArray.splice(currentRow['rowIndex'], 1, {
                         'DepartmentId': this.inputDepartmentId(),
                         'DepartmentName': this.inputDepartmentName(),
                         'LocationId': this.inputLocationId(),
                         'ManagerId': this.inputManagerId()
                      });
        }
    }.bind(this);
    
    //used to remove the selected row
    this.removeRow = function()
    {
        var element = document.getElementById('table');
        var currentRow = element.currentRow;

        if (currentRow != null)
        {
            this.deptObservableArray.splice(currentRow['rowIndex'], 1);
        }
    }.bind(this);
    
    //intialize the observable values in the forms
    this.inputDepartmentId = ko.observable();
    this.inputDepartmentName = ko.observable();
    this.inputLocationId = ko.observable();  
    this.inputManagerId = ko.observable();

    this.currentRowListener = function(event)
    {
      var data = event.detail;
      if (event.type == 'currentRowChanged' && data['value'] != null)
      {
        var rowIndex = data['value']['rowIndex'];
        var dept = this.deptObservableArray()[rowIndex];
        if (dept != null) {
          this.inputDepartmentId(dept['DepartmentId']);
          this.inputDepartmentName(dept['DepartmentName']);
          this.inputLocationId(dept['LocationId']);
          this.inputManagerId(dept['ManagerId']);
        }
      }
    }.bind(this);

        

    

      }
      
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    var vm=new DashboardViewModel();
    $(document).ready(
      function()
      {
        //ko.applyBindings(vm, document.getElementById('tableDemo'));
        var table = document.getElementById('table');
       table.addEventListener('currentRowChanged', vm.currentRowListener);
      }
    );
    return vm;
   
        
  }
);
