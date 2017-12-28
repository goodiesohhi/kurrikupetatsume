import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import 'bootstrap-sass';
$(".navbar-toggle").click();


 Meteor.subscribe('userData');
 Template.Bot.user = function() {
    return Meteor.user();
  }

/*

Register TEMPLATE
*/
Template.register.onRendered(function(){
   var validator = $('.register').validate({
	    rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
			var username = $('[name=username]').val();
            Accounts.createUser({
                email: email,
                password: password,
				username: username
            }, function(error){
                if(error){
                    validator.showErrors({
						email: error.reason    
				});
                } else {
                    Router.go("home");
                }
            });
        }    
    });
});
Template.register.events({
    'submit form': function(event){
        event.preventDefault();
  
	}
});
/*

NAV TEMPLATE
*/



Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});
/*

LOGIN TEMPLATE
*/
Template.login.events({
    'submit form': function(event){
       event.preventDefault();
    }
});
Template.login.onRendered(function(){
	event.preventDefault();
      var validator = $('.login').validate({
		
		submitHandler: function(event){
			 
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password,function(error){ 
		if(error){
        validator.showErrors({
        email: error.reason    
    });
    } else {
        var currentRoute = Router.current().route.getName();
        if(currentRoute == "login"){
            Router.go("home");
        }
    }});
		}
	});
});
/*

Shop TEMPLATE
*/

  Template.shop.events({
    'click input.buy': function(event) {
     key = cutethings.findOne( {_id:"veryimportantbunny"} ).key
	
      Meteor.call('buy', 100,0,NaN,key);
	  
    }
  });
  Template.msgbox.helpers(
  {
	  user:function(){
		    return Meteor.user();
	  },
  }
  
  );
  
  Template.shop.helpers(
  {
	  user:function(){
		    return Meteor.user();
	  },
  }
  
  );
  Template.shop.onRendered(function(){
	  
	  
	   Meteor.call('setmsg', 'Welcome to the Shop.');
	   Meteor.subscribe('pets');
    $('.shop').validate({
        rules: {
            // rules go here
        }
    });
});

/*

Pet code
*/

 Template.petbox.events({
    'click .evo': function(event) {
		key = cutethings.findOne( {_id:"veryimportantbunny"} ).key

      Meteor.call('evo', event.target.id,key);
    },
	
	 'click .int': function(event) {
		 key = cutethings.findOne( {_id:"veryimportantbunny"} ).key

      Meteor.call('int', event.target.id,key);
    }
  });
  


  Template.mypets.onRendered(function(){
	   Meteor.call('setmsg', 'View your pets here.');
	   
	    Meteor.subscribe('pets');
	   
   
});
Template.profile.helpers({
	viewpet:function(user){
		
		 var username=Router.current().params.username;
		
		 var id=  Meteor.users.findOne({
            username:username
        })._id;
		
		var common=cutethings.find({
      "user": id,
	  
    }).fetch();
	
	 
	
	return common
	},
	 user:function(){
		    return Meteor.user();
	  },
 
 
	
});

Template.mypets.helpers({
	
	
 eggs:function(){
	 
	
    eggs=cutethings.find({
      "user": Meteor.userId(),
	  
	   'dex':0
    }).fetch();
   
    

	
	return eggs
 },
 commonpet:function(){
	 common=cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 1,
	   'dex': {$gt: 0}
    }).fetch();
	return common
 },
  slcpet:function(){
    
    return cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 2,
	      'dex': {$gt: 0}
    }).fetch();
 },
  rarepet:function(){
    
    return cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 3,
	     'dex': {$gt: 0}
    }).fetch();
 },
  suppet:function(){
    
    return cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 4,
	     'dex': {$gt: 0}
    }).fetch();
	
 },
  secpet:function(){
    
    return cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 5,
	     'dex': {$gt: 0}
    }).fetch();
 },
 
 isegg:function(getdata){
	 
	return getdata === 0
	
	 
 },
 
 canevolve:function(data,data2){
	 return data>=data2;
 },
 
  notnumber:function(data){
	 return data=NaN;
 }
 
 
});

Template.petbox.helpers({
	
	
 commonpet:function(){
    
    common=cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 1,
    }).fetch();
	
	return common
 },
  slcpet:function(){
    
    return cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 2,
    }).fetch();
 },
  rarepet:function(){
    
    return cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 3,
    }).fetch();
 },
  suppet:function(){
    
    return cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 4,
    }).fetch();
 },
  secpet:function(){
    
    return cutethings.find({
      "user": Meteor.userId(),
	  'rarity': 5,
    }).fetch();
 },
 
 isegg:function(getdata){
	 
	return getdata === 0
	
	 
 },
 
 canevolve:function(data,data2){
	 return data>=data2;
 },
 
  notnumber:function(data){
	 return isNaN(data);
 }
 
});



  function cfl(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  
  Meteor.users.deny({
    update() { return true; }
})
  
/*

USERPAGE TEMPLATE
*/