/*global todomvc, angular, Firebase */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebaseArray service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $firebaseArray, $sce, $localStorage) {

  // set local storage
	$localStorage["admin"] = "yes";
  $scope.$storage = $localStorage;

  var splits = $location.path().trim().split("/");
	var roomId = splits[1];
	if (!roomId || roomId.length == 0) {
		roomId = "all";
	}
	$scope.roomId = roomId;

	var url = "https://classquestion.firebaseio.com/" + roomId + "/questions/";
	var echoRef = new Firebase(url);

	// Bind the todos to the firebase provider.
	//$scope.todos = $firebaseArray(fireRef);

//  echoRef.child("echo").setWithPriority( maxEcho, -maxEcho );

	var query = echoRef.orderByChild("order").limitToFirst(25);
  //var query = echoRef.orderByPriority().limitToFirst(25);

	$scope.todos = $firebaseArray(query);

	$scope.newTodo = '';
	$scope.editedTodo = null;

	$scope.$watch('todos', function () {
		var total = 0;
		var remaining = 0;
		$scope.todos.forEach(function (todo) {
			// Skip invalid entries so they don't break the entire app.
			if (!todo || !todo.head ) {
				return;
			}

			total++;
			if (todo.completed === false) {
				remaining++;
			}

			// set time
			todo.dateString = new Date(todo.timestamp).toString();
			todo.tags = todo.wholeMsg.match(/#\w+/g);

			 todo.trustedDesc = $sce.trustAsHtml(todo.linkedDesc);
		});
		$scope.totalCount = total;
		$scope.remainingCount = remaining;
		$scope.completedCount = total - remaining;
		$scope.allChecked = remaining === 0;
		$scope.absurl = $location.absUrl();
	}, true);

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();

		// No input, so just do nothing
		if (!newTodo.length) {
			return;
		}

		var head = newTodo;
		var desc = "";


		var firstCRPos = newTodo.indexOf('\n');
		if (firstCRPos != -1) {
			head = newTodo.slice(0, firstCRPos);
			desc = newTodo.slice(firstCRPos);
		}

		$scope.todos.$add({
			wholeMsg: newTodo,
			head: head,
			desc: desc,
			linkedDesc: Autolinker.link(desc, {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			order: 0
		});
		$scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		$scope.originalTodo = angular.extend({}, $scope.editedTodo);
	};

	$scope.addEcho = function (todo) {
		$scope.editedTodo = todo;
		todo.echo = todo.echo + 1;
		// Hack to order using this order.
		todo.order = todo.order -1;
		$scope.todos.$save(todo);

    // Disable the button
		$scope.$storage[todo.$id] = "echoed";
	};

	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		var wholeMsg = todo.wholeMsg.trim();
		if (wholeMsg) {
			$scope.todos.$save(todo);
		} else {
			$scope.removeTodo(todo);
		}
	};

	$scope.revertEditing = function (todo) {
		todo.wholeMsg = $scope.originalTodo.wholeMsg;
		$scope.doneEditing(todo);
	};

	$scope.removeTodo = function (todo) {
		$scope.todos.$remove(todo);
	};

	$scope.clearCompletedTodos = function () {
		$scope.todos.forEach(function (todo) {
			if (todo.completed) {
				$scope.removeTodo(todo);
			}
		});
	};

	$scope.toggleCompleted = function (todo) {
			todo.completed = !todo.completed;
			$scope.todos.$save(todo);
	};

	$scope.markAll = function (allCompleted) {
		$scope.todos.forEach(function (todo) {
			todo.completed = allCompleted;
			$scope.todos.$save(todo);
		});
	};

	$scope.FBLogin = function () {
		var ref = new Firebase("https://classquestion.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
             console.log("Login Failed!", error);
        } else {
					$scope.$apply(function() {
                 	$scope.$authData = authData;
									$scope.isAdmin = true;
          });
					console.log("Authenticated successfully with payload:", authData);
       }
    });
	};

	$scope.FBLogout = function () {
		var ref = new Firebase("https://classquestion.firebaseio.com");
		ref.unauth();
        delete $scope.$authData;
			  $scope.isAdmin = false;
	};

	if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location;
});
