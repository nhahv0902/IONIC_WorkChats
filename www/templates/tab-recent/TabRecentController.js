/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('RecentCtrl', function ($scope, Chats, $stateParams, MultipleViewsManager, MessageService) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    $scope.activities = Chats.all();

    $scope.remove = function (item) {
        Room.remove(item);
    };


    $scope.message = MessageService.get($stateParams.messageId);

    MultipleViewsManager.updated('view-message', function (params) {
        $scope.message = MessageService.get(params.messageId);
    });

    $scope.messages = MessageService.all();
    $scope.selectedMessageId = 0;

    if (MultipleViewsManager.isActive()) {
        MultipleViewsManager.updateView('view-message', {messageId: $scope.selectedMessageId});
    }

    $scope.changeMessage = function (message) {
        $scope.selectedMessageId = message.id;
        console.log(MultipleViewsManager.isActive());
        if (MultipleViewsManager.isActive()) {
            MultipleViewsManager.updateView('view-message', {messageId: message.id});
        } else {
            $state.go('viewMessage', {messageId: message.id});
        }
    };
});
