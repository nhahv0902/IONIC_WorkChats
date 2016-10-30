var appServices = angular.module('starter.services', []); // Use for all service of application.

appServices.factory('Chats', function () {
	// Might use a resource here that returns a JSON array
	// Some fake testing data
	var chats = [{
			id: "1",
			friendType: "Messenger",
			name: "felix",
			face: 'img/user01.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active today"
            },
		{
			id: "2",
			friendType: "facebook",
			name: "Eric",
			face: 'img/user02.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active 1h ago"
            },
		{
			id: "3",
			name: "Apple",
			friendType: "Messenger",
			face: 'img/user03.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active today"
            },
		{
			id: "213",
			name: "Diamond",
			friendType: "Messenger",
			face: 'img/user04.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active 3m ago"
            },
		{
			id: "5",
			name: "Mike",
			friendType: "facebook",
			face: 'img/user05.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active today"
            }];

	return {
		all: function () {
			return chats;
		},
		remove: function (chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		get: function (chatId) {
			for(var i = 0; i < chats.length; i++) {
				if(chats[i].id === parseInt(chatId)) {
					return chats[i];
				}
			}
			return null;
		}
	};
});


appServices.factory('Firebase', function () {

	var message = "Messages";
	var account = "Accounts";
	var topic = "Topics";

	return {
		keyMessage: function () {
			return message;
		},
		keyAccount: function () {
			return account;
		},
		keyTopic: function () {
			return topic;
		}
	}
});
