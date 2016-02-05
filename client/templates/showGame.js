Template.showGame.helpers({
    canJoin: function () {
        return (this.status == 'open' && this.host._id !== Meteor.user()._id);
    },
    move: function () {
        var player = (this.host._id === Meteor.user()._id) ? 'host' : 'guest';
        return this[player].move;
    },
    moved: function () {
        var player = (this.host._id === Meteor.user()._id) ? 'host' : 'guest';
        return this[player].move !== null;
    }
});

function makeAMove(move) {
    var player = (this.host._id === Meteor.user()._id) ? 'host' : 'guest';
    var opponent = (this.host._id === Meteor.user()._id) ? 'guest' : 'host';
    if (this[opponent].move != null) {
        var update = {
            $set: {
                'host.move': null,
                'guest.move': null
            }
        };

        var outcome = (3 + move - this[opponent].move) % 3;

        if (outcome == 1) {
            update.$inc = {};
            update.$inc[player + '.score'] = 1;
        } else if (outcome == 2) {
            update.$inc = {};
            update.$inc[opponent + '.score'] = 1;
        }

        Games.update(this._id, update);
    } else {
        var $set = {};
        $set[player + '.move'] = 0;
        Games.update(this._id, {$set: $set});
    }
}

Template.showGame.events({
    'click .finishGame': function () {
        Games.update(this._id, {
            $set: { status: 'archived' }
        });
        Router.go('/');
    },
    'click .joinGame': function () {
        var user = Meteor.user();
        user.score = 0;
        user.move = null;

        Games.update(this._id, {
            $set: {
                guest: user,
                status: 'started'
            }
        });
    },
    'click .rock': function () {
        makeAMove.bind(this)(0);
    },
    'click .paper': function () {
        makeAMove.bind(this)(1);
    },
    'click .scissors': function () {
        makeAMove.bind(this)(2);
    }
});
