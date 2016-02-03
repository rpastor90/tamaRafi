app.config( $stateProvider => {
    $stateProvider.state('creatureComputer', {
        url: '/creaturecomputer',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    })
})

app.controller('creatureComputerCtrl', function ($scope, $state, user, AuthService) {
    $scope.user = user

    $scope.friends = ['TamaKat', 'TamaJess', 'TamaGabe'];

    $scope.animals = animals

});
