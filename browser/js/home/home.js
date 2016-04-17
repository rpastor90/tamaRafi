app.config(function($stateProvider) {
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
            };
            $scope.showDemo = function() {
                $scope.videoShown = true;
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    template: '<iframe width="700" height="500" src="https://www.youtube.com/embed/JrKzXQVxNi8" frameborder="0" allowfullscreen></iframe>',
                    controller: function($scope, $uibModal) {
                        console.log($scope)
                        
                        $scope.demo = () => {
                            $scope.$close()
                            $uibModal.open({
                                animation: $scope.animationsEnabled,
                                templateUrl: '/js/signup/signup.html',
                                controller: 'SignupCtrl'
                            })
                    };
                    }
                });
            };
        },
        resolve: {
            user: function(UserFactory, $state) {
                return UserFactory.getUser()
                    .then(function(user) {
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
