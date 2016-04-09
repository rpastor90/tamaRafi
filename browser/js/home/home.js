app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, $http, $uibModal, user) {
            // $scope.testing = function () {
            //     var obj = {
            //         startTime: '10:00',
            //         duration: 30000000,
            //         date: '2016-01-20'
            //     };
            //     $http.post('/api/users/' + user._id + '/sleep/timeseries', obj)
            //     .then(res => {
            //         console.log("res", res)
            //     })
            // }
            $scope.demo = () => {
                console.log('demo clicked')
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '/js/demo/demo.html',
                    controller: 'SignupCtrl'
                })
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
