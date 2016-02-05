app.directive('animal', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/animal/animal.html'
    };
});

app.factory('AnimalFactory', function () {
    var AnimalFactory = {};

    var animals = [{
        picture: "http://createalittle.com/wp-content/uploads/2014/01/panda_colour.png",
        bio: 'Never forgets to skip leg day',
        goals: 'Monster trapezii & gold chains',
        species: 'Panda',
        idx: 0,
        animationForward: 'sprite .5s steps(12) infinite',
        animationBack: 'sprite 1.5s steps(12) infinite',
        animateStyle: {
            'width': '250px',
            'height': '354px',
            'background-image': 'http://createalittle.com/wp-content/uploads/2014/01/panda_colour.png',
        }
    }, {
        picture: "http://i.imgur.com/OfL5Alp.png",
        bio: 'A driven athlete. Tends to have a work hard/play hard attitude',
        goals: 'Better diet & sleep',
        species: 'Rhino',
        idx: 1,
        animateStyle: {
            'width': '1487px',
            'height': '95px',
            'background-image': 'http://i.imgur.com/OfL5Alp.png',
            'animationForward': 'sprite .5s'
        }
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
