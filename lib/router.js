Router.configure({
    layoutTemplate: 'appBody'
});

Router.route('/', function () {
    this.render('hello');
});

Router.route('/games/:_id', function () {
    var game = Games.findOne({_id: this.params._id});
    this.render('showGame', {data: game});
});