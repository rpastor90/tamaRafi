app.config(function ($stateProvider) {
    $stateProvider.state('firstTimeUser', {
        url: '/welcome',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        controller: function($scope, animals) {
        	console.log(animals);
        	$scope.animals = animals;
        	$scope.onDisplay = 0;
        	$scope.nextAnimal = function() {
        		$scope.onDisplay++;
        	}
        }, 
        resolve: {
        	animals: function(AnimalFactory){
        		return AnimalFactory.fetchAnimals();
        	}
        }
    });
});
