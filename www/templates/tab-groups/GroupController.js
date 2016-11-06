/**
 * Created by Nhahv on 11/6/2016.
 */
appControllers.controller('GroupsCtrl', function ($scope, $localStorage) {
  $scope.groups = $localStorage.groups;

  for (var i = 0; i < $localStorage.groups.length; i++) {
    console.log($localStorage.groups[i]);
  }

  var topics = $localStorage.members;
  console.log("GroupsCtrl");
  //noinspection JSDuplicatedDeclaration
  for (var i = 0; i < topics.length; i++) {
    console.log(topics[i]);
  }
});
