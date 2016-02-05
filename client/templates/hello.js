Template.hello.helpers({
    yourGames: function () {
        return Games.find({
            status: {$ne: 'archived'},
            $or: [
                {'host._id': Meteor.user()._id},
                {'guest._id': Meteor.user()._id}
            ]
        });
    }
});

Template.hello.events({
    'click .newGame': function () {
        var user = Meteor.user();
        user.score = 0;
        user.move = null;

        var gameId = Games.insert({
            status: 'open',
            host: user
        });
        Router.go('/games/' + gameId);
    }
});
