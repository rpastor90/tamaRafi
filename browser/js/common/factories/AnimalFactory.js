app.factory('AnimalFactory', function() {
    var AnimalFactory = {};
    var animals = [{
        name: 'Trap Giraffe',
        picture: "https://cdn.scratch.mit.edu/static/site/users/avatars/592/8068.png",
        bio: 'Never forgets to skip leg day',
        goals: 'Monster trapezii & gold chains',
        species: 'giraffe',
        idx: 0
    }, {
        name: 'Get Swole Kangaroo',
        picture: "https://cdn.scratch.mit.edu/static/site/users/avatars/592/8068.png",
        bio: 'A driven athlete. Tends to have a work hard/play hard attitude',
        goals: 'Better diet & sleep',
        species: 'kangaroo',
        idx: 1
    }, {
        name: 'Hungry Hog',
        picture: "https://cdn.scratch.mit.edu/static/site/users/avatars/592/8068.png",
        bio: 'An appetite for self-improvement',
        goals: 'Slimmer physique',
        species: 'hog',
        idx: 2
    }]
    AnimalFactory.fetchAnimals = function() {
        return animals;
    }
    return AnimalFactory;
})
