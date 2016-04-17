app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $uibModal) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        AuthService.login(loginInfo).then(function() {
            // close the modal
            $scope.$close();
            $state.go('crib')
        })
        .then(null, (err) => {
            $scope.error = 'Invalid login credentials. Please try again.'
        })
    };

    $scope.backToSignUp = function() {
        $scope.$close()

        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/signup/signup.html',
            controller: 'SignupCtrl'
        })
    }
});