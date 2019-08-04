/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'ojs/ojbootstrap', 'ojs/ojvalidation-base', 'ojs/ojknockout', 'ojs/ojvalidation-datetime', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojlabel',
],
 function(ko, Bootstrap, validationBase) {

    function AboutViewModel() {
      
     // this.timeAxisTypeValue = ko.observable('enabled');
  
      /* toggle button variables */
      this.orientationValue = ko.observable('vertical');
      this.applyConverter = ko.observable("remove");

      /* chart data */
      var regularSeries = [{name: "Series 1", items: [42, 55, 36, 22, 32, 39]},
                           {name: "Series 2", items: [34, 30, 50, 46, 36, 27]}];

      var regularGroups = ["2014-03-27T01:00Z", "2014-03-27T02:00Z", "2014-03-27T03:00Z", "2014-03-27T04:00Z", "2014-04-27T05:00Z", "2014-04-27T06:00Z"];

      var mixedSeries = [{name: "Series 1", items: [
                              {x: "2014-03-04T00:00Z", y: 42},
                              {x: "2014-03-10T00:00Z", y: 55},
                              {x: "2014-03-18T00:00Z", y: 36},
                              {x: "2014-03-27T00:00Z", y: 22}]},
                         {name: "Series 2", items: [
                              {x: validationBase.IntlConverterUtils.dateToLocalIso(new Date(2014,2,6)), y: 34},
                              {x: validationBase.IntlConverterUtils.dateToLocalIso(new Date(2014,2,11)), y: 30},
                              {x: validationBase.IntlConverterUtils.dateToLocalIso(new Date(2014,2,15)), y: 50},
                              {x: validationBase.IntlConverterUtils.dateToLocalIso(new Date(2014,2,22)), y: 46}]}];

      var mixedGroups = ["Group A", "Group B", "Group C", "Group D"];

      var dateTimeConverter = validationBase.Validation.converterFactory("datetime");
      var dateOptions = {day: 'numeric', month: 'numeric'};
      this.dayMonth = dateTimeConverter.createConverter(dateOptions);
      var dateOptions2 = {year: 'numeric'};
      this.year = dateTimeConverter.createConverter(dateOptions2);
      var dateOptions3 = {year: '2-digit', month: 'numeric', day: 'numeric'};
      this.dayMonthYear = dateTimeConverter.createConverter(dateOptions3);

      this.xAxisOptions1 = ko.observable({});
      this.xAxisOptions2 = ko.observable({});

      this.regularSeriesValue = ko.observableArray(regularSeries);
      this.regularGroupsValue = ko.observableArray(regularGroups);

      this.mixedSeriesValue = ko.observableArray(mixedSeries);
      this.mixedGroupsValue = ko.observableArray(mixedGroups);

      /* toggle buttons*/
      this.updateData = function(event) {
        if (event.detail.value == "apply"){
          this.xAxisOptions1({tickLabel: {converter: [ko.toJS(this.dayMonth), ko.toJS(this.year)]}});
          this.xAxisOptions2({tickLabel: {converter: ko.toJS(this.dayMonthYear)}});
        }
        else{
         this.xAxisOptions1({});
         this.xAxisOptions2({});
        }
      }.bind(this);
    
    
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
