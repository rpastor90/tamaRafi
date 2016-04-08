app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    // $scope.signup = {};
    $scope.error = null;

    $scope.sendsignup = function () {
        console.log('in the send signup area and here is AutherService', AuthService)
    
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