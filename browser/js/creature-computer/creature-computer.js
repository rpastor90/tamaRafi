app.controller('CreatureComputerCtrl', function ($scope, $uibModal, UserFactory) {
    // Modal stuff
    $scope.animationsEnabled = true;
   

    $scope.showSocial = function () {
        console.log("$uibModal", $uibModal);
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
    console.log(user);
    $scope.friends = user.animal.friends;
    $scope.posts = user.animal.posts;
    console.log($scope.friends);
     $scope.addFriend = function(friendName) {
        UserFactory.addFriend(user, friendName);
        
     };
     $scope.goToFriendPage = function(friend) {
       console.log("going to firend page")
        $scope.friend = friend;
        console.log($scope.friend, "SCOPE FRIEND")
        $scope.showPostForm = true;

     };
     $scope.createPost = function(post) {
        $scope.post = post;
        $scope.showBetsy = true;
        // UserFactory.addPost(user, post, $scope.friend)
        // .then(()=>{$scope.showPostForm = false; })
     }

})
