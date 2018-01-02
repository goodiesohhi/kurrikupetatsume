import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import 'bootstrap-sass';
$(".navbar-toggle").click();
pet=[];
selected=[];
 Meteor.subscribe('pets');
var selectedDep = new Tracker.Dependency();

 Meteor.subscribe('userData');
 Template.Bot.user = function() {
    return Meteor.user();
  }
  
    $( document ).ready(function() {
		console.log("Loaded")
					
 
});


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
                    Router.go("Shop");
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
	
      Meteor.call('buy',100,0,NaN,key);
	  
    },
	    'click input.buyslot': function(event) {
  
	
      Meteor.call('buyslot');
	  
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
	  
	  slotprice:function() {
		  var user = Meteor.user();
		  return (user.slots+1)*1000
	  }
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

      Meteor.call('interact', event.target.id,key);
    },
	
	'mousedown .int': function(event) {
		
		 $('#'+event.target.id).attr("src","/altint.png");
	},
	
	'mouseup .int': function(event) {
		
		 $('#'+event.target.id).attr("src","/interact.png");
	}
	


  });
  


  Template.mypets.onRendered(function(){
	  
	   Meteor.call('setmsg', 'View your pets here.');
	   
	    Meteor.subscribe('pets');

	   
   
});

Template.Breeding.onRendered(function(){
	   Meteor.call('setmsg', 'Here is the place to breed and stuff');
	   
	    Meteor.subscribe('pets');
		
	    Meteor.subscribe('mypairs');
	   
   
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

Template.Breeding.helpers({
	
maxed:function(data,data2){
	 return data>=data2;
 },
 
 cansubmit:function(){
	 selectedDep.depend()
	 
	 return selected.length == 2;
	 
 },
 
isselected:function(id){

	 selectedDep.depend()
	 return !selected.includes(id.toString())
 },
 	pairs:function(){
		
		 
		
		var pet =breeding.find({
      "user": Meteor.userId(),
	  
	   
    }).count();
	
	 
	
	return pet
	},
	
	canmake:function(){
		var user = Meteor.user();
		var breed =breeding.find({
      "user": Meteor.userId(),
	  
	   
    }).count();
	
	
	
	var slot = user.slots

	return breed < slot
	
	
	 
	
	
	},
 
 
	breedpet:function(){
		
		 
		
		var pet =cutethings.find({
      "user": Meteor.userId(),
	  
	   'evo':"none",
	   'partner':0,
    }).fetch();
	
	 
	
	return pet
	},
	
	pair:function(){
		
		 
		
		var pet = breeding.find({
      "user": Meteor.userId(),
	  
	  
    }).fetch();

	 
	
	return pet
	},
	
	user:function(){
		    return Meteor.user();
	  },
 
 
	
});

Template.mypets.helpers({
		user:function(){
		    return Meteor.user();
	  },
 
	
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
	
	pet: function () {
		
		lol=cutethings.find({
      "user": Meteor.userId(),
	  
    });
	
	return lol
		
	},
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

Template.players.helpers (
{
	players:function () {
		 return Meteor.users.find({}, {
      sort: {
        'geld': -1
      }
    }).fetch();
	},
	petcount:function (player) {
		return count();
	},
	
	viewpet:function(id){
		
		
		return cutethings.find({
      "user": id,
	  
    }).count();
	
},
})

Template.players.onRendered ( function()
{
	Meteor.subscribe('pets');
}

)


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Template.petbox.onRendered ( function()
{

	$( ".petdiv").each(function() {
		var anim = ["bouncing","rolling"]
		var selectedanim = anim[getRandomInt(0,1)]
	
		
	if (!$("." +this.id +" > .petimg").hasClass("bouncing")) {
	$("." +this.id +" > .petimg").addClass(selectedanim);
	}
	
	
	
	});
	

}

)
//Breeding


 Template.Breeding.events({
    'click input.set': function(event) {
     key = cutethings.findOne( {_id:"veryimportantbunny"} ).key
	 var pet1=selected[0]
	 var pet2=selected[1]
	 
	 if(!pet1||!pet2)
	 {
		 
	 } else {
	 
      Meteor.call('createpair', selected[0],selected[1],key);
	   var pet=[]
	 
	 
	 }
	  
    },
	
	 'click .intpair': function(event) {
		 key = cutethings.findOne( {_id:"veryimportantbunny"} ).key

      Meteor.call('intpair', event.target.id,key);
    },
	
	'mousedown .intpair': function(event) {
		
		 $('#'+event.target.id).attr("src","/altint.png");
	},
	
	'mouseup .intpair': function(event) {
		
		 $('#'+event.target.id).attr("src","/interact.png");
	},
	
	
	 'click .select': function(event) {
		

      pet.push(event.target.id); 
	  selected.push(event.target.id);
	   selectedDep.changed();
    },
	'click .recieve': function(event) {
		 key = cutethings.findOne( {_id:"veryimportantbunny"} ).key

      Meteor.call('recieve', event.target.id,key);
    }
	
  });