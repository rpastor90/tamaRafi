app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $http, $uibModal, user) {
            $scope.demo = () => {
                $scope.demoModal = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '/js/signup/signup.html',
                    controller: 'SignupCtrl'
                })
            };
            $scope.close = () => {
                $scope.demoModal.close();
            }
        },
        resolve: {
            user: function(UserFactory, $state) {
                return UserFactory.getUser()
                .then(function (user) {
                    // user should not be allowed to go home when logged in
                    if (user) {
                        $state.go('crib');
                    }
                    return user;
                })
            }
        }
    });
});
