app.controller('CreatureComputerCtrl', function ($scope, AuthService, $uibModal) {
    // Modal stuff
    $scope.animationsEnabled = true;
   

    $scope.showSocial = function () {
        console.log("opening?")
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/creature-computer/creature-computer.html',
            controller: 'OpenComputerController',
            resolve: {
                user: function(AuthService) {
                    return AuthService.getLoggedInUser();
                }
            }
        });
    };


})

.controller('OpenComputerController', function ($scope, $uibModalInstance, user, UserFactory) {
    $scope.user = user;
    $scope.friends = [{name: 'TamaKat', post:'Missed you at the gym today, bro.'},
            {name: 'TamaJess', post:'Jog in Central Park this weekend?'},
            {name: 'TamaGabe', post:'Been meaning to tell you, you\'ve been looking so swole lately.  What\'s your routine?'}
             ];

     $scope.addFriend = function(friendName) {
        UserFactory.addFriend(user, friendName)
     }

})
