var appControllers = angular.module('starter.controllers', []); // Use for all controller of application.

appControllers.controller('DashCtrl', function ($scope) {});

appControllers.controller('ChatsCtrl', function ($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();
	$scope.remove = function (chat) {
		Chats.remove(chat);
	};
});

appControllers.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
});

appControllers.controller('AccountCtrl', function ($scope) {
	$scope.settings = {
		enableFriends: true
	};
});


appControllers.controller('SignInCtrl', function ($scope, $state) {
	console.log("SignInCtrl");
	$scope.btnSignIn = function () {
		console.log("singIn");
		$state.go('tab.dash');
	};
});


appControllers.controller('SignUpCtrl', function ($scope) {

});



appControllers.controller('ForgotPasswordCtrl', function ($scope) {

});
