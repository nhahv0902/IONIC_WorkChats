/**
 * Created by Nhahv on 11/1/2016.
 */
appControllers.controller('MessageListCtrl', function ($scope, $state, MultipleViewsManager, MessageService, Chats) {

  $scope.members = Chats.all();
  if (MultipleViewsManager.isActive()) {
    MultipleViewsManager.updateView('view-message', {messageId: $scope.selectedMessageId});
  }
});

appControllers.controller('ViewMessageCtrl', function ($scope, $stateParams, MultipleViewsManager, MessageService, Firebase, $ionicScrollDelegate) {
  $scope.message = MessageService.get($stateParams.messageId);

  MultipleViewsManager.updated('view-message', function (params) {
    $scope.message = MessageService.get(params.messageId);
  });

});

