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
    $scope.friends = [{name: 'TamaKat', post:'Missed you at the gym today, bro.'},
    {name: 'TamaJess', post:'Jog in Central Park this weekend?'},
    {name: 'TamaGabe', post:'Been meaning to tell you, you\'ve been looking so swole lately.  What\'s your routine?'}
     ];



});
