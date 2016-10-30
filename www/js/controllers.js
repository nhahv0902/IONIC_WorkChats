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
	$scope.chats = Chats.all();
	$scope.remove = function (chat) {
		Chats.remove(chat);
	};
});

appControllers.controller('ChatDetailCtrl', function ($rootScope, $localStorage, $scope, $stateParams, Firebase, Chats, $ionicScrollDelegate) {

	$scope.historyBack = function () {
		window.history.back();
	};

	$scope.chat = {};
	$scope.chat.name = "hoang Van Nha";
	$scope.idSend = "123456789";
	var idReceiver = $stateParams.chatId;
	if(idReceiver === "123456789") {
		$scope.idSend = "987654321";
	}


	$scope.chatList = [];

	var keyMessage = Firebase.keyMessage();
	var date = new Date();

	var url = keyMessage + '/' + $scope.idSend + '/' + idReceiver;
	var urlReceiver = keyMessage + '/' + idReceiver + '/' + $scope.idSend;

	$ionicScrollDelegate.scrollBottom(true);

	firebase.database()
		.ref(url)
		.on('child_added', function (data) {
			console.log(data.val());
			$scope.chatList.push(data.val());
			$ionicScrollDelegate.scrollBottom(true);
		});

	$scope.sendChat = function (chatText) {

		var time = date.getTime();
		var objectMesaage = {

			time: time,
			idSend: $scope.idSend,
			idReceiver: idReceiver,
			text: chatText
		};
		var key = firebase.database()
			.ref()
			.child(url)
			.push()
			.key;

		firebase.database()
			.ref()
			.child(url + '/' + key)
			.set(objectMesaage, function (error) {
				if(error) {
					console.log("write date error");
				} else {

					firebase.database()
						.ref()
						.child(urlReceiver + '/' + key)
						.set(objectMesaage, function (error) {
							if(error) {
								console.log("write date error");
							} else {
								console.log("write date success");
							}
						});

				}
			});

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

appControllers.controller('ForgotPasswordCtrl', function ($scope, $ionicPopup) {

	$scope.forgotPassword = {};


	function validateEmail(elementValue) {
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(elementValue);
	}
	$scope.btnForgotPassword = function () {
		console.log("password");

		var email = $scope.forgotPassword.email;

		console.log(email);
		if(validateEmail(email)) {
			var auth = firebase.auth();
			auth.sendPasswordResetEmail(email)
				.then(function () {
					// Email sent.
					var alertPopup = $ionicPopup.alert({
						template: 'Check email to sign in with new password',
						okText: 'OK'
					});
				}, function (error) {
					// An error happened.
					var alertPopup = $ionicPopup.alert({
						template: 'Email do not',
						okText: 'OK'
					});
				});
		} else {
			var alertPopup = $ionicPopup.alert({
				template: 'Email do not',
				okText: 'OK'
			});
			return;
		}

	};


});
