'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;
  var browser;
  var compile;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $browser,
    $compile,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
      compile = $compile;
      browser = $browser;
      var dick = '<textarea type="text" id="new-todo" class="form-control" placeholder="Search or Post Question" ng-model="input.wholeMsg" autofocus></textarea>';
      window.document.body.insertAdjacentHTML('afterbegin', dick);
      
    }));

    describe('TodoCtrl Testing', function() {
      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"? . Hello. co this is Kaichen", exp: "?"},
          {str:"Hello. co this is Kaichen", exp: "Hello."},
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},
          {str:"Hello. co this? is Kaichen", exp: "Hello."},  
          {str:"Hello?? This is Sung", exp: "Hello??"},
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
      });
      

      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });
      

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });
      
      it('scroll testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        window.scroll();
      });
      
      it('editTodo test', function() {
        location.path('/new/path');
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });
        var todo;
        scope.editTodo(todo);
        //expect(scope.roomId).toBe("new");
      });
      
      it('increaseMax test', function(){
        
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
        
        scope.maxQuestion = 4;
        scope.totalCount = 14;
        scope.increaseMax();
        expect(scope.maxQuestion).toEqual(14);
        
        scope.maxQuestion = 5;
        scope.totalCount = 5;
        scope.increaseMax();
      });
      
      it('Todo Add/Edit/Done/Clear Completed Todo testing', function() {
     
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $controller: controller,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window,
        });
 
        scope.input = {wholeMsg: ""};
        scope.addTodo();
 
        scope.input.wholeMsg = "testing 1";
        scope.addTodo();
 
        scope.input.wholeMsg = "testing 2";
        scope.addTodo();
 
        expect(scope.todos.length).toBe(2); //Should be 2 questions, ignoring the empty one
 
        scope.$digest();
        //Editing question
        scope.doneEditing(questionList2[1]);
        scope.editTodo(questionList2[2]);
        scope.revertEditing(questionList2[1]);
        scope.doneEditing(questionList2[2]);
 
        scope.clearCompletedTodos();
        expect(scope.todos.length).toBe(2); //Should be 2 questions
 
        scope.todos.push( {
            wholeMsg: "newTodo",
            head: "head",
            headLastChar: "?",
            desc: "desc",
            linkedDesc: "linkedDesc",
            completed: true,
            timestamp: 0,
            tags: "...",
            echo: 3,
            order: 3
    });
        expect(scope.todos.length).toBe(3); //Should be 3 questions now, adding questions by hard-code
 
        scope.clearCompletedTodos(); 
 
    //Keep testing for potential error
 
        scope.editTodo(questionList2[0]);
        scope.doneEditing(questionList2[0]);

      });
      
             
      it('Facebook Login', function() {
     
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
 
            scope.FBLogin();
            expect(scope.isAdmin).toBeUndefined();
             //expect(questionList2[0].echo).toBe(4);
      });

      it('FBLogout Test', function () {
        var control = controller('TodoCtrl', {
          $scope: scope
        });
        scope.FBLogout();
        expect(scope.isAdmin).toEqual(false);
      });
    });
  });
