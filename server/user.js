Accounts.onCreateUser(function(options, user) {
	console.log(options);
	console.log(user);
    if (options.profile) {
        options.profile.credit = 0;
        options.profile.consumed = 0;
        options.profile.admin = false;
        user.profile = options.profile;
    }

    return user;
});