'use strict';
 
beforeEach(module('todomvc'));
 
describe('todoFocus directive', function () {
    var scope, compile, browser;
 
    beforeEach(inject(function ($rootScope, $compile, $browser) {
        scope = $rootScope.$new();
        compile = $compile;
        browser = $browser;
    }));
 
    it('should focus', function () {
        var el = angular.element('<input todo-focus="focus">');
        var element = compile(el)(scope);
        scope.focus = false;
 
 
 
        expect(browser.deferredFns.length).toBe(0);     //Initial timeout array condition -> length = 0
 
        scope.$apply(function () {
            scope.focus = true;
        });
 
        expect(browser.deferredFns.length).toBe(1);     //If timeout occured -> length = 1 (since we do it once)
 
        scope.$apply(function () {
            scope.focus = false;
        });
 
 
        expect(browser.deferredFns.length).toBe(1);     //Expecting timeout is not occured -> length still equal to 1
    });
});
 
 
describe('todoEscape directive', function () {
    var scope, compile, browser;
 
    beforeEach(inject(function ($rootScope, $compile, $browser) {
        scope = $rootScope.$new();
        compile = $compile;
 
    }));
 
    it('should escape', function () {
        var el = angular.element('<input todo-blur="escape">');
        var element = compile(el)(scope);
 
            element.triggerHandler({type: 'keydown', keyCode: 65});
            scope.$digest();
 
            element.triggerHandler({type: 'keydown', keyCode: 27});
            scope.$digest();
 
 
    });
});