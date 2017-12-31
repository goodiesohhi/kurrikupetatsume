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

  Meteor.publish('mypairs', function(){
   
    return breeding.find();
});

 Meteor.publish('pets', function(){
   
      return cutethings.find();
});


Meteor.startup(() => {
	
makekey()
 cutethings.update({$or:[{"partner":null},{"partner":{$exists:false}}]},
{$set:{"partner":0},

},
{ multi: true }
)

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
  recieve:function (id,key) {
	  var currentUser = Meteor.userId();
	  var pair= breeding.findOne( {_id:id } )
	 //  if(key!=supersecretkey) {
		//	throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		//};
		 if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        };
  if(pair.exp >= pair.maxexp){
		
		 if(pair.user != currentUser)
		 {throw new Meteor.Error ('illegalrequest',"Nice Try.")};
	  
	   
	  	  var rare=eggrarity(pair.chain)-1
		  
		  var egggroup2 = []
		  egggroup2.push(cutethings.findOne( {_id:pair.pet1 } ).groupnumber)
		  egggroup2.push(cutethings.findOne( {_id:pair.pet2 } ).groupnumber)
		  gengroup= egggroup2[getRandomInt(0,1)]
	
	  var gen= groups[gengroup-1][rare][getRandomInt(0, groups[gengroup-1][rare].length-1)]
	  
	  var gegg= egggroup[gengroup-1]
	  
	 
	  
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
		partner:0,
		groupnumber:gen.gnumber
    });
	if (pair.max>pair.chain) {
	 breeding.update({_id : id},
	 {$inc:{ exp: -1*pair.maxexp, chain : 1, maxexp: Math.ceil(pair.maxexp*0.25) ,}
	 
	 },
	 {$set:{exp:0,}}
	 );
	 
	
  }
	} else {
		
		 breeding.update({_id : id},
	 
	 {$set:{exp:0,}}
	 );
		
	}
  },
  intpair:function (id,key) {
	  var currentUser = Meteor.userId();
	  //if(key!=supersecretkey) {
		//	throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		//};
		 if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        };
		var pair= breeding.findOne( {_id:id } )
		 if(pair.user != currentUser)
		  {throw new Meteor.Error ('illegalrequest',"Nice Try.")};
	  if(pair.exp < pair.maxexp){
	  breeding.update({_id : id},{$inc:{exp : 1, }});
	  }
	  
  },
  createpair:function (pet1,pet2,key){
	  var currentUser = Meteor.userId();
	  //if(key!=supersecretkey) {
		//	throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		//};
		 if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        };
		var pet11= cutethings.findOne( {_id:pet1 } )
		var pet21= cutethings.findOne( {_id:pet2 } )
		
		
		if(pet11.user != currentUser)
		  {throw new Meteor.Error ('illegalrequest',"Nice Try.")};
	   if(pet21.user != currentUser)
		  {throw new Meteor.Error ('illegalrequest',"Nice Try.")};
	  //done erorrchecks
	
	 
	  if(pet11.partner==0&&pet21.partner==0)
	  {
		  var lolmax=(pet11.rarity+pet21.rarity)*50
		  
		  breeding.insert({
			  pet1:pet11._id,
			  pet2:pet21._id,
			  img1: pet11.group+"/"+pet11.dex+"."+pet11.forme,
			  img2: pet21.group+"/"+pet21.dex+"."+pet21.forme,
			 
			  user: currentUser,
			  chain:0,
			  max: lolmax,
			  exp: 0,
			  maxexp: 500,
			  active: true
		  })
		  
		    cutethings.update({_id : pet11._id},{$set:{partner:pet21._id }});
			cutethings.update({_id : pet21._id},{$set:{partner:pet11._id }});
 
		  
	  } else 
	  {
		  if(pet1.partner != pet2._id || pet2.partner != pet1._id){
            throw new Meteor.Error("illegalpair", "Already Bonded");
        };
		 breeding.update({pet1 : pet1._id},{$set:{chain:0, active:true,}});
	  }
	  
  },
  interact: function(id,key) {
	  var currentUser = Meteor.userId();
	  
	 // if(key!=supersecretkey) {
		//	throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		//};
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
	//   if(key!=supersecretkey) {
		//	throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		//}
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
		'recent': "/cutethings/"+next.group+"/"+next.dex+"."+target.forme
        

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
	//	if(key!=supersecretkey) {
		//	throw new Meteor.Error("consolemanipulation", "Anomaly Detected.");
		//}
		
		if(isNaN(group)) {
			group= getRandomInt(1,groups.length)
			
		}
    
    if (Meteor.user().geld >= amount && amount > 0){
		var currentUser = Meteor.userId();
		

	  var rare=eggrarity(multi)-1
	
	  var gen= groups[group-1][rare][getRandomInt(0, groups[group-1][rare].length-1)]
	  var gegg= egggroup[group-1]
	 
	  
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
		partner:0,
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

  },
  
  
  
  
});
function eggrarity(multi){
	var max = Math.ceil(10000/((multi+100)/100))
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
//
 
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