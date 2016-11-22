/**
 * Created by Nhahv on 11/12/2016.
 */
appControllers.controller('MembersCtrl', function ($scope, $localStorage, Data) {

  Data.getMemberOfGroup('1234566');
  $scope.memberOfGroups = $localStorage.memberOfGroup;
});
