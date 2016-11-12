/**
 * Created by Nhahv on 11/12/2016.
 */
appControllers.controller('MembersCtrl', function ($scope, $localStorage, Data) {
  $scope.memberOfGroups = $localStorage.memberOfGroup;
  Data.getMemberOfGroup('1234566');
});
