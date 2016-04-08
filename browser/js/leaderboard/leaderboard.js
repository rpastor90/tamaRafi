app.controller('LeaderboardCtrl', function ($scope, $uibModal, UserFactory) {
    $scope.animationsEnabled = true;

    $scope.showLeaderboard = function() {
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/leaderboard/leaderboard.html',
            controller: 'OpenLeaderboardCtrl',
            resolve: {
                user: function () {
                    if (UserFactory.getCachedUser().animal) return UserFactory.getCachedUser();
                    else return UserFactory.getUser();
                }
            }
        });
    };
})
.controller('OpenLeaderboardCtrl', function ($scope, user, LeaderboardFactory) {
    $scope.user = user;
    
    var fullstackers = [
        {
            name: 'tamaJoe',
            animal: { totalSteps: 5832 }
        },
        {
            name: 'Katniss',
            animal: { totalSteps: 40929 }
        },
        {
            name: 'Sethwazhere',
            animal: { totalSteps: 32394 }
        },
        {
            name: 'Mark',
            animal: { totalSteps: 9432 }
        },
        {
            name: 'Jess',
            animal: { totalSteps: 33847 }
        }
    ];

    LeaderboardFactory.getEveryone()
    .then(function (allUsers) {
        fullstackers.forEach(function (fakeProfile) {
            allUsers.push(fakeProfile);
        });
        $scope.rankedUsers = allUsers.sort(function (a, b) {
            return b.animal.totalSteps - a.animal.totalSteps;
        });
    });
})
.factory('LeaderboardFactory', function ($http) {
    var LeaderboardFactory = {};
    LeaderboardFactory.getEveryone = function () {
        return $http.get('/api/users/')
        .then(function (allUsers) {
            return allUsers.data;
        });
    };
    return LeaderboardFactory;
});