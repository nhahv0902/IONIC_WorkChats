/**
 * Created by Nhahv on 11/1/2016.
 */
appControllers.controller('MessageListCtrl',
  function ($scope, $state, MultipleViewsManager, $stateParams, ChatsGroups, $localStorage) {

    console.log('MessageListCtrl');
    //noinspection JSUnresolvedVariable
    var id = $stateParams.groupId;
    console.log(id);
    ChatsGroups.getMemberOfTopic(id);
    $scope.members = $localStorage.memberOfTopic;

  });

appControllers.controller('ViewMessageCtrl',
  function ($scope, $stateParams, MultipleViewsManager, $ionicScrollDelegate,
            ChatsGroups, $localStorage, $q) {

    //noinspection JSUnresolvedVariable
    var id = $stateParams.groupId;
    console.log(id);

    console.log('ViewMessageCtrl');
    console.log($localStorage.messageTopic);
    ChatsGroups.getMessageTopic(id);

    $scope.message = ChatsGroups.chats();

    $scope.idSend = $localStorage.user.uid;
    console.log($scope.idSend);

    $ionicScrollDelegate.scrollBottom(true);
    var information = $localStorage.account;

    $scope.sendChat = function (chatText) {
      var time = (new Date()).getTime();
      var objectMessage = {
        time: time,
        idSend: $scope.idSend,
        text: chatText,
        avatar: information.avatar
      };
      ChatsGroups.send(objectMessage, id);
    };
  });

