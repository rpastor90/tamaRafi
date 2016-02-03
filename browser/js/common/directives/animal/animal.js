app.directive('animal', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/animal/animal.html'
    };
});

app.factory('AnimalFactory', function () {
    var AnimalFactory = {};
    
    var animals = [{
        name: 'Trap Giraffe',
        picture: "https://media.giphy.com/media/PiiQ5B1XxxiX6/giphy.gif",
        bio: 'Never forgets to skip leg day',
        goals: 'Monster trapezii & gold chains',
        species: 'giraffe',
        idx: 0
    }, {
        name: 'Get Swole Kangaroo',
        picture: "https://media.giphy.com/media/1zMfdhVHejLDG/giphy.gif",
        bio: 'A driven athlete. Tends to have a work hard/play hard attitude',
        goals: 'Better diet & sleep',
        species: 'kangaroo',
        idx: 1
    }, {
        name: 'Hungry Hog',
        picture: "http://31.media.tumblr.com/d734bb9abfd268b063b40a3c3b9d4323/tumblr_mv7apkoXVY1rfg20go1_500.gif",
        bio: 'An appetite for self-improvement',
        goals: 'Slimmer physique',
        species: 'hog',
        idx: 2
    }];

    AnimalFactory.fetchAnimals = function () {
        return animals;
    };

    return AnimalFactory;
})
