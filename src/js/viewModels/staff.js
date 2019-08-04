define(['knockout','ojs/ojcore','ojs/ojvalidation-base','ojs/ojarraydataprovider','ojs/ojselectcombobox','ojs/ojknockout','ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojdatetimepicker','ojs/ojradioset'],
function(ko,oj,ValidationBase,ArrayDataProvider)
{   
  function viewModel()
  {
    var self= this;
    

    self.fname = ko.observable("");
    self.lname = ko.observable("");
    self.email = ko.observable("");
    self.mobile = ko.observable("");
    self.date = ko.observable();
    self.selectVal = ko.observable('');
  
    self.gender = [
      {value: 'Male', label: 'Male'},
      {value: 'Female', label: 'Female'},
      {value: 'Other', label: 'Other'}
    ];

    self.genderDP = new ArrayDataProvider(self.gender, {keyAttributes: 'value'});
    self.course = ko.observable("");
  }
  
  return new viewModel();
});