/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('RecentCtrl', function ($scope, $localStorage) {

  $scope.members = $localStorage.memberRecent;
});
