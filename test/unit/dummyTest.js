describe('Service unit testing', function() {
  beforeEach(module('myApp.services'));

  describe('Version testing', function() {
    it('current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});


/* 컨트롤러 단위 테스트 Controller Unit Test */
describe('controllers unit test', function(){
  beforeEach(module('myApp.services'));
  var scope;
  it('MyCtrl1 controller test1', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
    expect(scope.test1).toEqual('EFG');
  }));
  it('MyCtrl2 controller test2', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl2', {
      $scope : scope
    });
    expect(scope.test2()).toBe('Hello!');
  }));

  it('setFirstAndRestSentence Dummy', inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    var ctrl = $controller('MyCtrl1', {
      $scope : scope
    });
    expect(scope.test1).toEqual('EFG');
    
    var results = scope.getFirstAndRestSentence("Hello? This is Sung");
    expect(results[0]).toEqual('Hello?');
    
    var results2 = scope.getFirstAndRestSentence("Hello? This is Kaichen.");
    expect(results2[0]).toEqual('Hello?');
    
    var results3 = scope.getFirstAndRestSentence("Hello. This is Kaichen?");
    expect(results3[0]).toEqual('Hello.');
    
    var result4 = scope.getFirstAndRestSentence("Hello This is Kaichen");
    expect(result4[0]).toEqual('Hello This is Kaichen');
    
    var result5 = scope.getFirstAndRestSentence("?.Hello This is Kaichen");
    expect(result5[0]).toEqual('?');
  }));

});
