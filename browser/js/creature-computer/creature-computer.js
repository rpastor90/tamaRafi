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
                    if (UserFactory.getCachedUser().animal) return UserFactory.getCachedUser();
                    else return UserFactory.getUser();
                }
            }
        });
    };


})

.controller('OpenComputerController', function ($scope, user, UserFactory) {
    $scope.user = user;
    $scope.friends = user.animal.friends;
    $scope.posts = user.animal.posts;
     $scope.addFriend = function(friendName) {
        UserFactory.addFriend(user, friendName);
        
     };
     $scope.goToFriendPage = function(friend) {
        $scope.friend = friend;
        $scope.showPostForm = true;

     };
     $scope.createPost = function(post) {
        $scope.post = post;
        $scope.showBetsy = true;
        // UserFactory.addPost(user, post, $scope.friend)
        // .then(()=>{$scope.showPostForm = false; })
     }

})
