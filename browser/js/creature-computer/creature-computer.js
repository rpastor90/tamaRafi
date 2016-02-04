app.config( $stateProvider => {
    $stateProvider.state('creatureComputer', {
        url: '/creature-computer',
        templateUrl: 'js/creature-computer/creature-computer.html',
        controller: 'creatureComputerCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    })
})

app.controller('creatureComputerCtrl', function ($scope, $state, user, AuthService) {

    $scope.user = user;
    console.log(user);

    $scope.friends = ['TamaKat', 'TamaJess', 'TamaGabe'];


});
