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
        animationForward: 'panda .5s steps(12) infinite',
        animationBack: 'panda 1.5s steps(12) infinite',
        animateStyle: {
            'width': '250px',
            'height': '354px',
            'background-image': 'url("http://createalittle.com/wp-content/uploads/2014/01/panda_colour.png")'
        }
    }, {
        picture: "http://i.imgur.com/OfL5Alp.png",
        bio: 'A driven athlete. Tends to have a work hard/play hard attitude',
        goals: 'Better diet & sleep',
        species: 'Rhino',
        idx: 1,
        animationForward: 'rhino .5s steps(10) infinite',
        animationBack: 'rhino 1.5s steps(10) infinite',
        animateStyle: {
            'width': '149px',
            'height': '95px',
            'background-image': 'url("http://i.imgur.com/OfL5Alp.png")'
        }
    }, {
        picture: "http://i.imgur.com/6HwBpck.png ",
        bio: 'An appetite for self-improvement',
        goals: 'Slimmer physique',
        species: 'Bulbasaur',
        idx: 2,
        animationForward: 'bird .5 steps(14) infinite',
        animationBack: 'bird 2s steps(14) infinite',
        animateStyle: {
            'width': '175px',
            'height': '200px',
            'background-image': 'url("http://i.imgur.com/6HwBpck.png")'
        }
    }];

    AnimalFactory.fetchAnimals = function () {
        return animals;
    };

    return AnimalFactory;
})
