/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('RecentCtrl', function ($scope, $localStorage, $rootScope) {

  $scope.members = $localStorage.memberRecent;
  $scope.search = '5334534';

  $rootScope.btnClean = function () {
    console.log('clear');
    $scope.search = '';
  }
});
