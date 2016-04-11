app.config(function($stateProvider) {
    $stateProvider.state('firstTimeUser', {
        url: '/firstTimeUser',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        controller: 'FirstTimeUserCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            user: function(UserFactory) {
                return UserFactory.getUser();
            }
        }
    });
});

app.controller('FirstTimeUserCtrl', function($scope, $state, UserFactory, user, PandaFactory) {
    $scope.user = user;
    $scope.panda = PandaFactory.getPanda();
    
    $scope.update = function(newUser) {
        return UserFactory.updateUser(newUser)
        .then(function() {
            $state.go('crib');
        })
    };

});
