app.directive('cribCreature', function () {
    return {
        restrict: 'E',
        controller: 'CreatureCtrl',
        templateUrl: 'js/common/directives/crib-creature/crib-creature.html'
    };
});

app.controller('CreatureCtrl', function ($scope) {

    var creature = document.getElementById('creatureContainer');
    var forwardInc = screen.width/200;
    var backwardInc = screen.width/400;

    var reverse = false;
    $scope.animal = $scope.user.animal;

    var incrementer = 0;
    function moveContainer () {
        if (reverse === false){ // walking across
            creature.style.transform = "scaleX(1)";
            creature.style.animation = $scope.animal.animationForward;
            incrementer += forwardInc;
            if (incrementer >= (screen.width / 5) * 4) reverse = true;
        }
        if (reverse === true) { // walking back
            creature.style.transform = "scaleX(-1)";
            creature.style.animation = $scope.animal.animationBack;
            incrementer -= backwardInc;
            if (incrementer <= 0) reverse = false;
        }

        var distance = incrementer.toString() + 'px';
        creature.style.marginLeft = distance;

        requestAnimationFrame(moveContainer);
    }
    
    moveContainer();

});
