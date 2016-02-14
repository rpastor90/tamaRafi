app.config(function($stateProvider) {
    $stateProvider.state('firstTimeUser', {
        url: '/firstTimeUser',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        controller: 'FirstTimeUserCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            animals: function(AnimalFactory) {
                return AnimalFactory.fetchAnimals();
            },
            user: function(UserFactory) {
                return UserFactory.getUser();
            }
        }
    });
});

app.controller('FirstTimeUserCtrl', function($scope, $state, UserFactory, animals, user, AuthService) {
    $scope.user = user;

    $scope.update = function(user) {
        return UserFactory.updateUser(user)
        .then(function() {
            $state.go('crib');
        })
    };

    $scope.animals = animals;
    $scope.onDisplay = 0;

    $scope.user.animal = Object.assign({}, $scope.user.animal, $scope.animals[$scope.onDisplay]);

    $scope.nextAnimal = function() {
        if ($scope.onDisplay >= 2) $scope.onDisplay = 0;
        else $scope.onDisplay++;
        $scope.user.animal = Object.assign({}, $scope.user.animal, $scope.animals[$scope.onDisplay]);
    };

});
