app.config(function($stateProvider) {
    $stateProvider.state('firstTimeUser', {
        url: '/firstTimeUser',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        controller: 'FirstTimeUserCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            panda: function(PandaFactory) {
                return PandaFactory.getPanda();
            },
            user: function(UserFactory) {
                return UserFactory.getUser();
            }
        }
    });
});

app.controller('FirstTimeUserCtrl', function($scope, $state, UserFactory, panda, user) {
    $scope.user = user;
    $scope.panda = panda;
    
    $scope.update = function(newUser) {
        return UserFactory.updateUser(newUser)
        .then(function() {
            $state.go('crib');
        })
    };

});
