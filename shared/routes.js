

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

Router.route("/pets/:petid",{
    name:"petpage",
    controller:"petController",
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

Router.route('/players', {
    name: 'players',
    template: 'players',
   
 
});

Router.route('/profile', {
    name: 'myprofile',
    template: 'myprofile',
   
 
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
		  Meteor.subscribe('mypairs');
		  
    }
});

Router.route('/chat', {
    name: 'chat',
    template: 'chat',
   
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
		  Meteor.subscribe('mypairs');
		  Meteor.subscribe('chatbox');
		  
    }
});

cutethings = new Mongo.Collection('cutethings');

breeding = new Mongo.Collection('breeding');
chat = new Mongo.Collection('chat');