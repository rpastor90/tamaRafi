app.config(function ($stateProvider) {

    $stateProvider.state('welcome', {
        url: '/welcome',
        controller: function(user, $state) {
            console.log('Welcome:', user.name)
            // check if animal's species is set instead of user.fitbit/jawbone
            if (user.animal.species && user.animal.name) {
                // switch firstTimeUser to crib once crib state is set up
                $state.go('crib');
            } else {
                $state.go('firstTimeUser');
            }
        },
        resolve: {
            user: function (UserFactory) {
                return UserFactory.getUser();
            }
        }
    });

});
