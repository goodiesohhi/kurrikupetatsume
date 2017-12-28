import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';


const percent = require('percent');

  Accounts.onCreateUser(function(options, user) {


    user.rank = "Fledgeling"
    user.geld = 100;
    
    user.pets = 0;
    user.login =true;

    return user;


  });
     



 Meteor.publish("userData", function() {
    return Meteor.users.find({}, {
      sort: {
        'pets': -1
      }
    });
  });

  Meteor.publish('mypets', function(){
    var currentUser = Meteor.user();
    return cutethings.find({ user: currentUser });
});

 Meteor.publish('pets', function(){
   
      return cutethings.find();
});


Meteor.startup(() => {
	
makekey()
  

});

Meteor.methods({
  'setmsg'(passedmsg) {
	  
	  	 Meteor.users.update({
        _id: this.userId
      }, {
       
		$set: {
        'msg': passedmsg,
        

      }
      });
   
   
  },
  int: function(id,key) {
	  var currentUser = Meteor.userId();
	  
	  if(key!=supersecretkey) {
			throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		};
	  if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        };
		
		var target= cutethings.findOne( {_id:id } )
		cutethings.update({_id : id},{$inc:{exp : 1, }});
		
	  
  },
  
  evo:function(id,key) {
	  var currentUser = Meteor.userId();
	  var target= cutethings.findOne( {_id:id } )
	  
	   var next= evogroups[target.groupnumber-1][target.evo]
	   if(key!=supersecretkey) {
			throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		}
	   if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        };
		
		
	  
	  
	  if(target.user != currentUser)
		  {throw new Meteor.Error ('illegalrequest',"Nice Try.")};
	 if(target.exp < target.max){
		 throw new Meteor.Error("exp-error","Conditions Not Met")
	 };
	 
	 
	 if (isNaN(target.evo)) {
		 
		 throw new Meteor.Error("Final-Form","Already at Final Form")
	 };
	
	  Meteor.users.update({
        _id: this.userId
      }, {
        $inc: {
          
          
          'geld': (100),
        },
		 $set: {
        'msg': "Evolution Succesful. "+next.name+" Get!",
		'recent': "./cutethings/"+next.group+"/"+next.dex+"."+target.forme
        

      },
	    $addToSet : { 'data' : next.name }
      });
	   
	  
   
	 
	

   cutethings.update({_id : id},{$set:{name : next.name, dex:next.dex, evo:next.evo, exp:target.exp-target.max, max:next.max+getRandomInt(Math.ceil(-0.25*next.max),Math.ceil(0.25*next.max)), }});
  },
  buy: function(amount,multi,group,key) {
	  
	  var currentUser = Meteor.userId();
	   if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
		if(key!=supersecretkey) {
			throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		}
		
		if(isNaN(group)) {
			group= getRandomInt(1,groups.length)
			
		}
    
    if (Meteor.user().geld >= amount && amount > 0){
		var currentUser = Meteor.userId();
		

	  var rare=eggrarity(multi)-1
	
	  var gen= groups[group-1][rare][getRandomInt(0, groups[group-1][rare].length-1)]
	  var gegg= egggroup[group-1]
	  console.log(gen)
	  
	  cutethings.insert({
		dex: 0,
		nick: "Egg",
        name: cfl(gen.group)+" Egg",
        user: currentUser,
		evo: gen.dex,
		exp:0,
		max:gegg.max+getRandomInt(Math.ceil(-0.25*gegg.max),Math.ceil(0.25*gegg.max)),
		egg:true,
		rarity: gen.rarity,
		group:gen.group,
		forme:petscripts[gen.name](),
		groupnumber:gen.gnumber
    });
	
	
      Meteor.users.update({
        _id: this.userId
      }, {
        $inc: {
          
          
          'geld': (0 - amount),
        },
		 $set: {
        'msg': "One egg purchased.",
        

      },
	 
      });
	
	
	  
	} else{
		
		 Meteor.users.update({
        _id: this.userId
      }, {
       
		$set: {
        'msg': "Not enough Geld",
        

      }
      });
		
		
		
	}

  }
  
  
});
function eggrarity(multi){
	var max = Math.ceil(1000/((multi+100)/100))
 var base = getRandomInt(1, max);

var tier=percent.calc(base, max, 0);
if (tier >= 98) {
    return 5;
} else if (tier >= 90 && tier < 98) {
   return 4;
} else if (tier >= 75&& tier < 90) {
	
    return 3;
}
else if (tier >= 50&& tier < 75){
	return 2;
}
else {
	return 1
}
///
 
};



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function makekey() {
	
	supersecretkey= Random.secret(getRandomInt(60,120))
  
   cutethings.update({_id : "veryimportantbunny"},{$set:{key : supersecretkey  }});
}

  function cfl(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  Meteor.setInterval(function(){
	 	
		
	  makekey()
  
}, 60000);