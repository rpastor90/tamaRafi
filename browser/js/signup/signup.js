app.config(function ($stateProvider) {

    // $stateProvider.state('signup', {
    //     url: '/signup',
    //     templateUrl: 'js/signup/signup.html',
    //     controller: 'SignupCtrl'
    // });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, $uibModal) {
    console.log('scope in signup', $scope)
    // $scope.signup = {};
    $scope.error = null;

    $scope.login = () => {
        // close previous modal
        $scope.$close()
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/login/login.html',
            controller: 'LoginCtrl'
        })
    }

    $scope.sendsignup = function () {
        $scope.$close()
        AuthService.signup($scope.signup)
        .then(function(returned) {
            console.log('I am in the signup controller after sending/signup to Ath Service')
            $state.go('firstTimeUser')
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
        // AuthService.signup(loginInfo).then(function () {
        //     $state.go('home');
        // })

    };

});