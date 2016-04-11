app.directive('panda', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/animal/animal.html'
    };
});

app.factory('PandaFactory', function () {

    var panda = {
        picture: "http://i.imgur.com/FdWT67J.png",
        idx: 0,
        animationForward: 'panda .5s steps(12) infinite',
        animationBack: 'panda 1.5s steps(12) infinite',
        animateStyle: {
            'width': '250px',
            'height': '354px',
            'background-image': 'url("http://i.imgur.com/hoG3HMY.png")'
        }
    };

    return {
        getPanda: () => {
            return panda;
        }
    };
});
