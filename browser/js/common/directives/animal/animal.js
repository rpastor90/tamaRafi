app.directive('animal', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/animal/animal.html'
    };
});

app.factory('AnimalFactory', function () {
    var AnimalFactory = {};
    
    var animals = [{
        picture: "http://i.imgur.com/VexuoSc.gif",
        bio: 'Never forgets to skip leg day',
        goals: 'Monster trapezii & gold chains',
        species: 'Charmander',
        idx: 0
    }, {
        picture: "http://25.media.tumblr.com/tumblr_lxb7i2z3oQ1qm7xzeo1_500.gif",
        bio: 'A driven athlete. Tends to have a work hard/play hard attitude',
        goals: 'Better diet & sleep',
        species: 'Squirtle',
        idx: 1
    }, {
        picture: "https://45.media.tumblr.com/539791143e3a9f7f8f949a0ea957936b/tumblr_nlpbghvXv31u9ftrro1_500.gif",
        bio: 'An appetite for self-improvement',
        goals: 'Slimmer physique',
        species: 'Bulbasaur',
        idx: 2
    }];

    AnimalFactory.fetchAnimals = function () {
        return animals;
    };

    return AnimalFactory;
})
