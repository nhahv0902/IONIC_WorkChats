/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('RecentCtrl', function ($scope, $stateParams, Chats, MultipleViewsManager, $localStorage) {

  $scope.members = $localStorage.memberRecent;
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
});
