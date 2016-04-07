var jQueryImport;
$(function() {
  $(document).on("click", "h2.subjectTitle:not(#newSubject *)", function(event) {
    if($(event.target).is(".fa-remove"))
      return;
    $(this).next().slideToggle(500);
    $(this).parent().toggleClass("closed");
  });
  $(document).on("keydown", "input[placeholder='New Assignment'], input[placeholder='New Subject'], textarea[placeholder='Description (Optional)']", function(event) {
    if(event.which != 13)
      return;
    event.preventDefault();
    if($(event.target).is("input"))
      $(this).next().click();
    else
      $(this).parent().prev().children("button").click();
  });
  $("input#importBox").blur(function() {
    if(!confirm("Are you sure you want to input this data?"))
      return;
    var scope = angular.element($("body")[0]).scope();
    var value = $(this).val();
    scope.$apply(function() {
      scope.homework = JSON.parse(value);
    });
    $(this).val("");
    $(this).slideToggle();
  });
});
angular.module("Agenda", [])
  .controller("AgendaController", function($scope) {
    $scope.homework = {
      "Math": {
        "Textbook Problems": "pp.223 #1-23 odds",
        "Study": "Test tomorrow on rational equations"
      },
      "Chemistry": {
        "Worksheet": "Ionic vs. Covalent Compounds",
      }
    };
    $scope.newSubject = "";
    $scope.addSubject = function() {
      if($scope.newSubject.trim() == "")
        return;
      $scope.homework[$scope.newSubject.trim()] = {};
      $scope.newSubject = "";
    };
    $scope.removeSubject = function(subject) {
      if(confirm("Are you sure you want to delete the subject \"" + subject + "\"?"))
        delete $scope.homework[subject];
    };
    $scope.addAssignment = function(subject) {
      if($scope.homework[subject].newAssignment.trim() == "")
        return;
      $scope.homework[subject][$scope.homework[subject].newAssignment] = $scope.homework[subject].newAssignmentDescription;
      $scope.homework[subject].newAssignment = "";
      $scope.homework[subject].newAssignmentDescription = "";
    };
    $scope.removeAssignment = function(subject, title) {
      if(confirm("Are you sure you want to delete the homework assignment \"" + title + "\"?"))
        delete $scope.homework[subject][title];
    };
    $scope.export = function() {
      var link = document.createElement("a");
      link.download = "THL-Agenda.json";
      link.href = "data:text/plain;charset:utf-8," + encodeURIComponent(JSON.stringify($scope.homework));
      link.click();
    };
    $scope.import = function() {
      $("input#importBox").slideToggle();
    };
  });
