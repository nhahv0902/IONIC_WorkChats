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

appControllers.controller('ChatDetailCtrl', function ($rootScope, $scope, $stateParams, Firebase) {



	$scope.chat = Chats.get($stateParams.chatId);

	var keyMessage = Firebase.keyMessage();
	var idSend = "123456789";
	var date = new Date();





	$scope.sendChat = function (chatText) {

		var time = date.getTime();
		var idReceiver = "987654321";

		var objectMesaage = {

			time: time,
			idSend: idSend,
			idReceiver: idReceiver,
			text: chatText
		};
		firebase.database()
			.ref(keyMessage + '/' + idSend + '/' + idReceiver)
			.set(objectMesaage);
	};

	var reply = function () {
		var userId;
		for(var i = 0; i < $scope.room.userList.length; i++) {
			if($scope.room.userList[i] != $rootScope.currentUserID) {
				userId = $scope.room.userList[i];
			}
		}
		var chatText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
		Chat.add(chatText, $stateParams.roomId, userId);
		$scope.chatList = Chat.getByRoom($stateParams.roomId);
	};


});

appControllers.controller('AccountCtrl', function ($scope) {
	$scope.settings = {
		enableFriends: true
	};
});


appControllers.controller('SignInCtrl', function ($scope, $state) {

	firebase.database()
		.ref('users/' + "nhahv")
		.set({
			username: "name",
			email: "email",
			profile_picture: "imageUrl"
		});
	console.log("SignInCtrl");
	$scope.btnSignIn = function () {
		console.log("singIn");
		$state.go('tab.dash');
	};
});


appControllers.controller('SignUpCtrl', function ($scope, $ionicPopup, $timeout, $mdDialog, $state) {

	console.log($mdDialog);
	$scope.signUp = {};

	$scope.btnSignUp = function () {

		console.log("sign Up");
		var email = $scope.signUp.email;
		var password = $scope.signUp.password;
		var confirmPassword = $scope.signUp.confirmPassword;

		if(!email) {
			var alertPopup = $ionicPopup.alert({
				template: 'Email do not',
				okText: 'OK'
			});

			alertPopup.then(function (res) {
				console.log('Thank you for not eating my delicious ice cream cone');
			});
			return;
		}

		if(password !== confirmPassword) {
			var alertPopup = $ionicPopup.alert({
				template: 'password do not match',
				okText: 'OK'
			});
			return;
		}

		firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log(errorCode);
				console.log(errorMessage);
				return;

			});


		$state.go('singIn');
	}

});


appControllers.controller('ForgotPasswordCtrl', function ($scope) {

});
