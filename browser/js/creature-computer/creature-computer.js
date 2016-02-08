app.controller('CreatureComputerCtrl', function ($scope, $uibModal, UserFactory) {
    // Modal stuff
    $scope.animationsEnabled = true;
   

    $scope.showSocial = function () {
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/creature-computer/creature-computer.html',
            controller: 'OpenComputerController',
            resolve: {
                user: function() {
                    return UserFactory.getUser();
                }
            }
        });
    };


})

.controller('OpenComputerController', function ($scope, $uibModalInstance, user, UserFactory) {
    $scope.user = user;
    // $scope.friends = [{name: 'TamaKat', post:'Missed you at the gym today, bro.'},
    //         {name: 'TamaJess', post:'Jog in Central Park this weekend?'},
    //         {name: 'TamaGabe', post:'Been meaning to tell you, you\'ve been looking so swole lately.  What\'s your routine?'}
    //          ];
    console.log(user);
    $scope.friends = user.animal.friends;
     $scope.addFriend = function(friendName) {
        UserFactory.addFriend(user, friendName)
     };
     $scope.goToFriendPage = function(friend) {
        $scope.friend = friend;
        $(.creaturecomputer)
     };

})
