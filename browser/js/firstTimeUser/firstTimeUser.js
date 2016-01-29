app.config(function ($stateProvider) {
    $stateProvider.state('firstTimeUser', {
        url: '/welcome',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        controller: function ($scope, animals, FirstTimeUserFactory) {
            var kinds = ['giraffe', 'kangaroo', 'hog'];

            $scope.update = FirstTimeUserFactory.update;

            $scope.animal = {};

            $scope.animals = animals;
            $scope.onDisplay = 0;
            $scope.animal.kind = kinds[0];
            $scope.nextAnimal = function () {
                if ($scope.onDisplay >= 2) $scope.onDisplay = 0;
                else $scope.onDisplay++;
                $scope.animal.kind = kinds[$scope.onDisplay];
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

    FirstTimeUserFactory.update = function (animal) {
        console.log("THIS IS THE ANIMAL", animal);
        return AuthService.getLoggedInUser()
            .then(function (user) {
                animal.sleep = user.fitbit.sleep;
                $http.put('/api/users/' + user._id, animal)
                    .then(function (updatedUser) {
                        console.log("THIS is the updated updatedUser from the frontend", updatedUser.data);
                        return updatedUser;
                    });
            });
    };

    return FirstTimeUserFactory;
});
