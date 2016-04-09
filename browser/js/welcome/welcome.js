app.config(function ($stateProvider) {

    $stateProvider.state('welcome', {
        url: '/welcome',
        controller: function(user, $state) {
            console.log('Welcome:', user.name);
            if (user.animal.name) {
                // switch firstTimeUser to crib once crib state is set up
                $state.go('crib');
            } else {
                $state.go('firstTimeUser');
            }
        },
        resolve: {
            user: function (UserFactory) {
                if (UserFactory.getCachedUser().animal) return UserFactory.getCachedUser();
                return UserFactory.getUser();
            }
        }
    });

});
