questionsJs
====

Inspired by Firebase & AngularJS TodoMVC Example

#### Configuration
Please change this firebase URL to your app URL. Otherwise, it won't work.

Change this file: /js/controllers/todoCtrl.js

var url = "https://classquestion.firebaseio.com/" + roomId + "/questions/";

#### How to install `node` and `npm`
- [Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows)
- [Mac](http://blog.teamtreehouse.com/install-node-js-npm-mac)
- [Linux](http://blog.teamtreehouse.com/install-node-js-npm-linux)

Local webserver
----

```
$ cd questionsJS (working directory)
$ sudo npm install -g karma
$ npm start
```

Unit Testing with [Karma](http://karma-runner.github.io/0.13/index.html)
----

#### Installation
```
$ sudo npm install -g karma karma-cli karma-coverage karma-chrome-launcher karma-jasmine
```

Test case: `test/unit/*`
```
$ karma start karma.conf.js
```

End-to-End Testing with [Protractor](http://www.protractortest.org/#/)
----

#### Installation
````
sudo npm install -g protractor
webdriver-manager update & webdriver-manager start
````

Test case: `test/e2e/*`
```
$ protractor protractor.conf.js
```
