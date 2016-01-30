app.config(function ($stateProvider) {
    $stateProvider.state('firstTimeUser', {
        url: '/firstTimeUser',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        controller: function ($scope, animals, FirstTimeUserFactory) {
            var species = ['giraffe', 'kangaroo', 'hog'];

            $scope.update = FirstTimeUserFactory.update;

            $scope.animal = {};

            $scope.animals = animals;
            $scope.onDisplay = 0;
            $scope.animal.species = species[0];
            $scope.nextAnimal = function () {
                if ($scope.onDisplay >= 2) $scope.onDisplay = 0;
                else $scope.onDisplay++;
                $scope.animal.species = species[$scope.onDisplay];
            };
        },
        resolve: {
            animals: function (AnimalFactory) {
                return AnimalFactory.fetchAnimals();
            }
        }
    });
});

app.factory('FirstTimeUserFactory', function ($http, AuthService) {
    var FirstTimeUserFactory = {};
    // ANIMAL SPECIES IN FORM DOES NOT SAVE
    FirstTimeUserFactory.update = function (animal) {
        return AuthService.getLoggedInUser()
            .then(function (user) {
                // animal.sleep = user.fitbit.sleep;
                $http.put('/api/users/' + user._id, animal)
                    .then(function (updatedUser) {
                        return updatedUser;
                    });
            });
    };

    return FirstTimeUserFactory;
});