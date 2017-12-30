

Router.route('/', {
    template: 'home',
	name: 'home',
});
Router.route("/users/:username",{
    name:"profile",
    controller:"ProfileController",
	subscriptions: function(){
         return Meteor.subscribe('pets');
    }
	
});
Router.route('/register');
Router.route('/login');
Router.route('/mypets', {
    name: 'mypets',
    template: 'mypets',
    data: function(){
       
        var currentUser = Meteor.userId();
       
    },
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    },
    subscriptions: function(){
          Meteor.subscribe('mypets');
    }
});

Router.configure({
    layoutTemplate: 'main',
	 loadingTemplate: 'loading'
});

Router.route('/shop', {
    name: 'Shop',
    template: 'Shop',
   
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    }
});

Router.route('/breed', {
    name: 'Breeding',
    template: 'Breeding',
   
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    },
	  subscriptions: function(){
          Meteor.subscribe('mypets');
    }
});

cutethings = new Mongo.Collection('cutethings');

breeding = new Mongo.Collection('breeding');