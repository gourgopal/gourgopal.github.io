var app = angular.module('WebApp', ['ngMaterial', 'ngMessages', 'ngRoute']);
app.config(['$routeProvider', '$mdThemingProvider', '$locationProvider', 
    function ($routeProvider, $mdThemingProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './Views/Home.html',
                controller: 'HomeController',
                controllerAs: 'Home'
            })
            .when('/Welcome', {
                templateUrl: './Views/Welcome.html',
                controller: 'WelcomeController',
            })
            .when('Home', { redirectTo: '/' })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
        // Mobile browsers status bar color
        $mdThemingProvider.enableBrowserColor({
            theme: 'default',
            palette: 'accent',      // <-- Note this, you have to use a predefined palette name
            hue: '200'
        });
    }]);
app.run(function ($rootScope, $mdDialog) {
    $rootScope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(ev.title)
                .textContent(ev.content)
                .ariaLabel('Alert Dialog')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };
});