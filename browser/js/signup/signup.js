app.controller('SignupCtrl', function ($scope, AuthService, $state, $uibModal) {
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
        AuthService.signup($scope.signup)
        .then(function(returned) {
            $scope.$close()
            $state.go('firstTimeUser')
        })
        .catch(function () {
            $scope.error = 'Something went wrong with signup. Please try again.';
        });
    };
});