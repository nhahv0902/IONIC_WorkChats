var appControllers = angular.module('starter.controllers', []); // Use for all controller of application.

appControllers.controller('RecentCtrl', function ($scope, Chats) {
	$scope.chats = Chats.all();
	$scope.remove = function (chat) {
		Chats.remove(chat);
	};

	$scope.activities = Chats.all();

	$scope.remove = function (item) {
		Room.remove(item);
	};
});

appControllers.controller('MembersCtrl', function ($scope, Chats) {
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

appControllers.controller('ChatDetailCtrl', function ($rootScope, $scope, $stateParams, Firebase, Chats) {

	$scope.historyBack = function () {
		window.history.back();
	};

	var idSend = "123456789";
	var idReceiver = $stateParams.chatId;
	if(idReceiver === "123456789") {
		idSend = "987654321";
	}

	var keyMessage = Firebase.keyMessage();
	var date = new Date();

	var url = keyMessage + '/' + idSend + '/' + idReceiver;
	var urlReceiver = keyMessage + '/' + idReceiver + '/' + idSend;
	$scope.sendChat = function (chatText) {

		var time = date.getTime();
		var objectMesaage = {

			time: time,
			idSend: idSend,
			idReceiver: idReceiver,
			text: chatText
		};
		var key = firebase.database()
			.ref()
			.child(url)
			.push()
			.key();

		firebase()
			.database()
			.ref()
			.child(url + '/' + key)
			.set(objectMesaage, function (error) {
				if(error) {
					alert("Data could not be saved." + error);
				} else {
					alert("Data saved successfully.");

					firebase()
						.database()
						.ref()
						.child(urlReceiver + '/' + key)
						.set(objectMesaage, function (error) {
							if(error) {
								alert("Data could not be saved." + error);
							} else {
								alert("Data saved successfully.");
							}
						});

				}
			});

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


appControllers.controller('SignInCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $ionicPopup, $localStorage) {

	$scope.signIn = {};

	$scope.btnSignIn = function () {
		console.log("singIn");

		var email = $scope.signIn.email;
		var password = $scope.signIn.password;

		if(!email || !password) {
			var alertPopup = $ionicPopup.alert({
				template: 'Email or password do not match',
				okText: 'OK'
			});
			return;
		}

		$ionicLoading.show();
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then(function (user) {
				console.log(user);

				$localStorage.user = {};

				var name = user.displayName;
				var email = user.email;
				var photoUrl = user.photoURL;
				var uid = user.uid;

				$localStorage.user.email = email;
				$localStorage.user.uid = uid;


				console.log($localStorage.user.uid);
				console.log($localStorage.user.email);

				$ionicLoading.hide()
				$state.go('tab.recent');



			})
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				var myPopup = $ionicPopup.show({
					title: 'Sign in  fault',
					subTitle: 'Email  or password do not match',
					buttons: [{
						text: '<b>Ok</b>',
						type: 'button-positive',
						onTap: function (e) {
							myPopup.close();
						}
					}]
				});
			});



	};
});


appControllers.controller('SignUpCtrl', function ($scope, $ionicPopup, $timeout, $mdDialog, $state, $ionicLoading, $ionicPopup) {

	console.log($mdDialog);
	$scope.signUp = {};

	$scope.btnSignUp = function () {

		console.log("sign Up");
		var email = $scope.signUp.email;
		var password = $scope.signUp.password;
		var confirmPassword = $scope.signUp.confirmPassword;

		if(!email || !password || !confirmPassword) {
			var alertPopup = $ionicPopup.alert({
				template: 'Email do not',
				okText: 'OK'
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

		$ionicLoading.show();
		firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(function (user) {
				if(user) {
					console.log(user);
					$state.go('singIn');
					$ionicLoading.hide()
				}
			})

		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);
			console.log(errorMessage);

			console.log(error);
			$ionicLoading.hide()
			var myPopup = $ionicPopup.show({
				title: 'Sign up account fault',
				subTitle: 'Email had exists',
				buttons: [{
					text: '<b>Ok</b>',
					type: 'button-positive',
					onTap: function (e) {
						myPopup.close();
					}
					}]
			});
		});
	}
});


appControllers.controller('GroupsCtrl', function ($scope, Groups) {
	console.log("Groups");
	$scope.groups = Groups.all();
});

appControllers.controller('ForgotPasswordCtrl', function ($scope) {

});
