app.config(function ($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        controller: 'CribCtrl',
        data : { authenticate: true },
        resolve: {
            user: function (AuthService, $state) {
                return AuthService.getLoggedInUser();
            },
            swags: function(AnimalFactory, AuthService) {
                return AuthService.getLoggedInUser()
                .then(function(user) {
                    return AnimalFactory.fetchSwagByUser(user)
                })  
            }
        }
    });

});

app.factory('CribFactory', function () {
    var CribFactory = {};

    return CribFactory;
});

app.controller('CribCtrl', function ($scope, $state, user, AuthService, swags, AnimalFactory) {
    // var tracker2 = function() {
    //     var obj = document.getElementById("beingMoved")
      
    //     console.log(obj.offsetTop, obj.scrollLeft, obj.clientLeft)
    // };

    $scope.user = user;
    $scope.isShown = false;
    $scope.swags = swags;
    // $scope.toggle = function9
    $scope.logout = function () {
        AuthService.logout()
        .then(function () {
           $state.go('home');
        });
    };

    $scope.onStart = function () {
        console.log( document.getElementById("beingMoved").offsetLeft)
        console.log("you started!")
    }

    $scope.tracker = function(input) {
        console.log(this, "this is the tracker function ")
        var obj = document.getElementById("beingMoved")
      
        console.log(obj.offsetTop, obj.scrollLeft, obj.clientLeft)
    };
    
    $scope.startCallback = function() {
        console.log("hello");

    };
    $scope.getCoords = function() {
        $('#beingMoved').draggable()
        console.log(this, "THIS")
        console.log(arguments, "ARGS")
    }
    
   
});