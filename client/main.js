import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import 'bootstrap-sass';
$(".navbar-toggle").click();
pet=[];
selected=[];
animnumber=[];
animnumbertwo=[];
hiding=null;
 sr = ScrollReveal({'reset': true});
 Meteor.subscribe('pets');
var selectedDep = new Tracker.Dependency();
var  animdep = new Deps.Dependency ;
var  hidedep = new Deps.Dependency ;
var options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
};  





 Meteor.subscribe('userData');
 
  
  Template.Bot.helpers({
	 speaker:function(){
		  
	  
	  
	  if (Router.current().route.getName()=="Shop"){
		  return "Shopkeep Bunnyball"
	  } 
	  else if (Router.current().route.getName()=="Breeding") {
		  return "Breeder Bunnyball"
	  }
	  else{
		  return "Helper"
	  }
	  },  
	 user: function(){
		 return Meteor.user();
	 },
  })
   Avatar.setOptions({
    customImageProperty: function() {
      var user = this;
      // calculate the image URL here
      return user.avatar;
    },
    imageSizes: {
      'large': 400,
      'mySize': 200
    }
  });
  
    $( document ).ready(function() {
		
					
 
});



Template.myprofile.helpers(
  {
	  
	
	
	user:function(){
		    return Meteor.user();
	  },

  }
  
  );
  
Template.navigation.helpers(
  {
	  
	
	
	user:function(){
		    return Meteor.user();
	  },

  }
  
  );
  
Template.main.helpers(
  {
	 
	  viewprofile:function(){
		 
		 return Router.current().route.getName()=="profile"
		
		
	},
	
	viewchat:function(){
		 
		 return Router.current().route.getName()=="chat"
		
		
	},
	
	user:function(){
		    return Meteor.user();
	  },

  }
  
  );


/*

Register TEMPLATE
*/

Template.myprofile.events({
    'submit form': function(event){
        event.preventDefault();
		var avatar = $('[name=avatar]').val();
		 Meteor.call('profileset',avatar);
		 Router.go("players");
		
  
	}
});

Template.chat.onRendered( function () {
	sr.reveal('.chatbox');
	
})

Template.chat.events({
    'submit form': function(event){
        event.preventDefault();
		var msg = $('[name=txtmsg]').val();
		$(".msg").val(""); 
		 Meteor.call('sendmsg',msg);
		 
		
  
	}
});

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
    
	
      Meteor.call('buy',100,0,NaN);
	  
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
	  
	  breeder:function(){
		  return Router.current().route.getName()=="Breeding"
	  },
  }
  
  );
  
  Template.onlinebox.helpers({
	  
	  usersOnlinecount : function() {
  return Meteor.users.find({ "status.online": true }).count()
},
	
	labelClass: function () {
		
		var thisuser=Meteor.users.findOne({}, {
      sort: {
        'geld': -1,
		 
      },
	   limit: 1
	    
    })._id
		
  if (this.status.idle){
    return "idle"
  }
  else if (this.status.online){
    return "online"
  }
  else if (this._id==thisuser)
  {
    return "champclass"
  }
  
  else {
	  
	  return "otherbox2"
	  
  }
	
	},
	

	
	usersOnline : function() {
  return Meteor.users.find({ "status.online": true }).fetch()
},
	
  }
  );
  
  Template.shop.helpers(
  {
	  
	  price: function (){
		  
	  var currentUser =  Meteor.userId()
	  var amountbase=100
	  var count = cutethings.find({ "user": currentUser }).count()
	  console.log(count)
	  
	  
	  if (count > 100 && count < 250 )
	  {
	  return count* 10
	  }
	  else if (count > 250 ){
	  return count* 50
	  }
	  else if (count == 0 && Meteor.user().geld<200 ){
	  return 1;
	  }
	  else {
		  return 100
	  }
		  
	  },
	  
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
		
  new Audio("/sounds/evolve.wav").play();     
      Meteor.call('evo', event.target.id);
    },
	
	'click .int': function(event) {
		
		 new Audio("/sounds/beep.wav").play(); 
 Meteor.call('interact', event.target.id);	
		 
		 
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
	   
	animdep.changed()
	
	    Meteor.subscribe('pets');
		
	    Meteor.subscribe('mypairs');
		
		
	   
   
});

Template.profile.onRendered(function(){
	   
	   	var divbox = $(this).find(".petdiv")
	var lol = this.$(".petdiv").attr('id')
	
	
	
	
		
	   
   
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
	
	thisuser:function(user){
		
		 var username=Router.current().params.username;
		
		 return  Meteor.users.findOne({ username:username });
		
		
	},
	
	
	
	 user:function(){
		    return Meteor.user();
	  },
 
 
	
});

Template.Breeding.helpers({
	
	user:function(){
		    return Meteor.user();
	  },
	
	breedhide:function(){
		hidedep.depend()
		return hiding==true
	},
	
	
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

Template.breedbox.helpers({
	animation:function (id) {
		
		var anim = ["bouncing","rolling","static"]
		
		  animdep.depend()
		 
		return anim[animnumbertwo[id]]
		
	},
	pet: function () {
		
		lol=cutethings.find({
      "user": Meteor.userId(),
	  
    });
	
	return lol
		
	},
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

Template.petbox.helpers({
	animation:function (id) {
		
		var anim = ["bouncing","rolling","static"]
		
		  animdep.depend()
		  
		 
		return anim[animnumber[id]]
		
	},
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

Template.chat.helpers ({
	
	user:function(){
		    return Meteor.user();
	  },
	  
formatTime:function(time){
	return time.toLocaleTimeString();
},

	usersOnline : function() {
  return Meteor.users.find({ "status.online": true }).fetch()
},

	usersOnlinecount : function() {
  return Meteor.users.find({ "status.online": true }).count()
},
	players:function () {
		 return Meteor.users.find({}, {
      sort: {
        'geld': -1
      }
    }).fetch();
	},

labelClass: function (username) {
	
	console.log(username)
		
		var thisuser=Meteor.users.findOne({}, {
      sort: {
        'geld': -1,
		 
      },
	   limit: 1
	    
    })._id
	
	var currentUser= Meteor.users.findOne({username:username}, {
      sort: {
        'geld': -1,
		 
      },
	   limit: 1
	    
    })
		console.log(thisuser+" "+currentUser._id)
  if  (currentUser._id==thisuser){
    return "champclass" 
  }
  else if (currentUser.status.online  && currentUser._id != thisuser){
    return "online1"
  }
  else if  (currentUser.status.idle && currentUser._id!=thisuser)
  {
    return "idle1"
  }
  
  else {
	  
	  return "otherbox1"
	  
  }
	
	},

chatmsg :function (){
	var msg = chat.find({}, {
      sort: {datefield: -1},
	  
	  limit: 30
	  
    }).fetch()
	
	return msg
	
}
}
)

Template.players.helpers (
{
	champion: function () {
		
     var champion = Meteor.users.findOne({}, {
      sort: {
        'geld': -1,
		
      },
	  
	  limit: 1
	  
    }).username
		
		return champion
	},
	
	
	ischampion: function () {
		var thisuser=Meteor.users.findOne({}, {
      sort: {
        'geld': -1,
		 
      },
	   limit: 1
	    
    })._id
		
		
		 if (this._id==thisuser){
    return true
  
		 }
     
		
	},
	
	labelClass: function () {
		
		var thisuser=Meteor.users.findOne({}, {
      sort: {
        'geld': -1,
		 
      },
	   limit: 1
	    
    })._id
		
  if (this.status.idle){
    return "idle"
  }
  else if (this.status.online){
    return "online"
  }
  else if (this._id==thisuser)
  {
    return "champclass"
  }
  
  else {
	  
	  return "otherbox2"
	  
  }
	
	},
	

	
	usersOnline : function() {
  return Meteor.users.find({ "status.online": true }).fetch()
},

	usersOnlinecount : function() {
  return Meteor.users.find({ "status.online": true }).count()
},
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
Template.breedbox.onRendered ( function () {

	
	var divbox = $(this).find(".petdiv")
	var lol = this.$(".petdiv").attr('id')
	
	

  animnumbertwo[lol] = getRandomInt(0,2)

  
	animdep.changed()
	 Meteor.subscribe('pets');
		
	    Meteor.subscribe('mypairs');
})


Template.petbox.onRendered ( function()
{
	var divbox = $(this).find(".petdiv")
	var lol = this.$(".petdiv").attr('id')
	
	
	
	
	
	
	  
	
	
	
  animnumber[lol] = getRandomInt(0,2)

	animdep.changed()
	 Meteor.subscribe('pets');
		
	    Meteor.subscribe('mypairs');
		
   
}

)
//Breeding


 Template.Breeding.events({
	 
	
	
    'click input.set': function(event) {
     
	 var pet1=selected[0]
	 var pet2=selected[1]
	 
	 if(!pet1||!pet2)
	 {
		 
	 } else {
	 
      Meteor.call('createpair', selected[0],selected[1]);
	   var pet=[]
	 
	 
	 }
	  
    },
	
	 'click .intpair': function(event) {
		
      
      Meteor.call('intpair', event.target.id);
    },
	
	'mousedown .intpair': function(event) {
		
		 $('#'+event.target.id).attr("src","/altint.png");
		 new Audio("/sounds/beep.wav").play(); 
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
		
      new Audio("/sounds/evolve.wav").play();
      Meteor.call('recieve', event.target.id);
    }
	
  });
  
  toggle= function(){
	  
     
	 if (hiding == true)
	 {
		 hiding= false
		
		  hidedep.changed()
		  $( ".hidebtn" ).removeClass( "active" );
	 } else {
		 hiding = true
		 $( ".hidebtn" ).addClass( "active" );
		  hidedep.changed()
		 
	 }
	  selected=[]
	  
  }