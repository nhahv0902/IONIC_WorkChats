/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('DetailGroupsCtrl', function ($scope, Groups, Topics) {

  $scope.backToGroups = function () {
    window.history.back();
  };

  $scope.newTopic = function () {

  };

  $scope.groups = {};
  $scope.groups.name = "I love coffe";

  $scope.topics = Topics.all();

  console.log("Groups detail");
  
});
