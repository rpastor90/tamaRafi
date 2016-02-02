app.factory('AnimalFactory', function($http) {
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
    var groupByThrees = function(arr) {
        var newAry =[];
        for (var i = 0; i < arr.length; i+=3) {
            var three = [];
            if (arr[i]) three.push(arr[i]);
            if (arr[i+1]) three.push(arr[i+1]);
            if (arr[i+2]) three.push(arr[i+2]);
            newAry.push(three);
        }
        return newAry;
    };

    AnimalFactory.fetchAnimals = function() {
        return animals;
    };

    AnimalFactory.fetchSwag = function() {
        var shelves;
        return $http.get('/api/swag')
        .then(function(swags) {
           shelves = groupByThrees(swags.data)
           return shelves;
        })
    };

     AnimalFactory.fetchSwagByUser = function(user) {
        return $http.get('/api/users/' + user._id + '/getSwag')
        .then(function(res) {
           return res.data.animal.swags;
        })
    };

    AnimalFactory.purchase = function(user, swag) {
        if (user.animal.money >= swag.price) {
            return $http.put('/api/users/' + user._id + '/getSwag/' + swag._id)
            .then(function(purchase) {
                if (purchase === 'User not found!') return 'You must be logged in to make a purchase.'
                return purchase.data;
                })
        } else {
            return 'unsuccessful purchase';
        }
    }

    return AnimalFactory;
})
