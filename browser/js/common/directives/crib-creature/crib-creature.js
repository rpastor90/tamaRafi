app.directive('cribCreature', function () {
    return {
        restrict: 'E',
        controller: 'CreatureCtrl',
        templateUrl: 'js/common/directives/crib-creature/crib-creature.html'
    };
});

app.controller('CreatureCtrl', function ($scope) {

    var creature = document.getElementById('creatureContainer');
    var reverse = false;
    $scope.animal = $scope.user.animal


    var incrementer = 0;
    function moveContainer () {
        if (reverse === false){ // walking across

            creature.style.transform = "scaleX(1)"
            creature.style.animation = $scope.animal.animationForward
            incrementer += 0.5;
            if (incrementer >= 100) reverse = true
            };
        if (reverse === true) { // walking back
            creature.style.transform = "scaleX(-1)"
            creature.style.animation = $scope.animal.animationBack
            incrementer -= 0.2;
            if (incrementer <= 0) reverse = false
        }

        var distance = incrementer.toString() + '%';
        creature.style.marginLeft = distance;

        requestAnimationFrame(moveContainer);
    }

    moveContainer();

});
