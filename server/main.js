import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';


const percent = require('percent');

  Accounts.onCreateUser(function(options, user) {


    user.rank = "Fledgeling"
    user.geld = 100;
	user.score=0;
    
    user.pets = 0;
    user.login =true;
	user.slots =1;

    return user;


  });
     



 Meteor.publish("userData", function() {
    return Meteor.users.find({}, {
      sort: {
        'pets': -1
      }
    });
  });
  
  
  
  
  


  Meteor.publish("onlineusers", function() {
  return Meteor.users.find({ "status.online": true });
});

  Meteor.publish("chatbox", function() {
  return chat.find();
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


function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

Meteor.startup(() => {

Meteor.setInterval(function(){
  botmsg()
  
}, 1200000);

	Meteor.setInterval(function(){
		deletechat()
  passivegain();
  
 
  
}, 100000);


	Meteor.setInterval(function(){

	
	 cutethings.find( { "sc" : { $exists: false } } ).map(function(pet) {
	  number = randInt(1,999);
        cutethings.update({
          _id: pet._id
        }, {
          $set: {
            'sc': number,
			
            
          },



        })
      });
  
  
}, 10000);


chat.remove({}, {
      sort: {datefield: 1},
	  
	  
	  
  })
botmsg()



 cutethings.update({$or:[{"partner":null},{"partner":{$exists:false}}]},
{$set:{"partner":0},

},
{ multi: true }
)

 Meteor.users.update({$or:[{"slots":0},{"slots":{$exists:false}}]},
{$set:{"slots":1},

},
{ multi: true }
)

breeding.update({$and:[{maxexp: { $gt: 200 }},{"setvar3":{$exists:false}}]},
{$set:{
	"maxexp":200,
	"setvar3":true,
},

},
{ multi: true }
)

});

Meteor.methods({
	
	
	'sendmsg'(msg) {
		
	  var id = Meteor.userId();
	  var user=  Meteor.users.findOne( {_id:id } )
	    chat.insert({
		datefield: new Date(),
		msg: msg,
        
        user: user._id,
		username: user.username,
		
    });
	
   
   
  },
	
	 'profileset'(avatar) {
	  
	  	 Meteor.users.update({
        _id: this.userId
      }, {
       
		$set: {
        'avatar': avatar,
        

      }
      });
   
   
  },
  'setmsg'(passedmsg) {
	  
	  	 Meteor.users.update({
        _id: this.userId
      }, {
       
		$set: {
        'msg': passedmsg,
        

      }
      });
   
   
  },
  recieve:function (id) {
	  var currentUser = Meteor.userId();
	  var pair= breeding.findOne( {_id:id } )

		 if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        };
  if(pair.exp >= pair.maxexp){
		
		 if(pair.user != currentUser)
		 {throw new Meteor.Error ('illegalrequest',"Nice Try.")};
	  
	  var champion = Meteor.users.findOne({}, {
		  
      sort: {
        'geld': -1,
		
      },
	  
	  limit: 1
	  
    })._id
	var rare =0;
	var chain =0;
	if (currentUser== champion){
		 rare=eggrarity(pair.chain*2)-1
		 chain=pair.chain*2
	} else{
	  	  
		  rare=eggrarity(pair.chain)-1
		  chain=pair.chain
	}
		  
		  var egggroup2 = []
		  egggroup2.push(cutethings.findOne( {_id:pair.pet1 } ).groupnumber)
		  egggroup2.push(cutethings.findOne( {_id:pair.pet2 } ).groupnumber)
		  supercompatability = false;
		  if ((cutethings.findOne( {_id:pair.pet1 } ).sc==cutethings.findOne( {_id:pair.pet2 } ).sc-1)||(cutethings.findOne( {_id:pair.pet1 } ).sc-1==cutethings.findOne( {_id:pair.pet2 } ).sc)||cutethings.findOne( {_id:pair.pet1 } ).sc==cutethings.findOne( {_id:pair.pet2 } ).sc){
			  supercompatability = true;
		  }
		  
		  if (supercompatability){
		  rare=eggrarity(chain*5)-1
	} 
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
    }, function(err,derp){
    
	Meteor.users.update({_id:currentUser},{
		$set:{
			
			msg:"Recieved one "  + cfl(gen.group)+" Egg",
		'recentid': derp,
		'recentname': cfl(gen.group)+" Egg",
		'recent': "/cutethings/"+gen.group+"/0.1",
		 
		
		
		}
		
		
	})
	
	

});

	
	
	
	
	if (pair.max>pair.chain) {
	 breeding.update({_id : id},
	 {$inc:{ exp: -1*pair.maxexp, chain : 1, maxexp: Math.ceil(pair.maxexp*0.1) ,}
	 
	 },
	 {$set:{exp:0,}}
	 );
	 
	
  }
	} else {
		
		 breeding.update({_id : id},
	 
	 {$set:{exp:0,}}
	 );
		
	}
	return "yes"
  },
  intpair:function (id) {
	  var currentUser = Meteor.userId();
	
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
  createpair:function (pet1,pet2){
	  var currentUser = Meteor.userId();
	 
		 if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        };
		var pet11= cutethings.findOne( {_id:pet1 } )
		var pet21= cutethings.findOne( {_id:pet2 } )
		
		if(pet11._id == pet21._id)
		  {throw new Meteor.Error ('illegalrequest',"Nice Try.")};
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
			  maxexp: 200,
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
  interact: function(id) {
	  var currentUser = Meteor.userId();

	  if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        };
		
		var target= cutethings.findOne( {_id:id } )
		cutethings.update({_id : id},{$inc:{exp : 1, }});
		
	  
  },
  
  evo:function(id) {
	  var currentUser = Meteor.userId();
	  var target= cutethings.findOne( {_id:id } )
	  
	   var next= evogroups[target.groupnumber-1][target.evo]
	
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
	 
	 
	 
 	  var geldgain = Math.ceil((100*Math.random())+100);
	  var scoreGain = 2**target.rarity;
	  Meteor.users.update({
        _id: this.userId
      }, {
        $inc: {
          
          
          'geld': (geldgain), 
		  'score': (scoreGain),
        },
		 $set: {
        'msg': "Evolution Succesful. "+next.name+" Get! + "+ geldgain + " Geld." +  "+" +scoreGain+ " Score!",
		'recent': "/cutethings/"+next.group+"/"+next.dex+"."+target.forme,
		'recentid': target._id,
		'recentname': next.name,
		'recentgain': geldgain,
		'recentScore': scoreGain,
        

      },
	    $addToSet : { 'data' : next.name }
      });
	   
	  
   
	 
	

   cutethings.update({_id : id},{$set:{name : next.name, dex:next.dex, evo:next.evo, exp:target.exp-target.max, max:next.max+getRandomInt(Math.ceil(-0.25*next.max),Math.ceil(0.25*next.max)), }});
  },
  buy: function(amount,multi,group) {
	  var currentUser = Meteor.userId();
	  var amountbase=100
	  var count = cutethings.find({ "user": currentUser }).count()
	  
	  if (count > 20 && count < 100 )
	  {
	  amount = Math.ceil(count* 15)
	  }
	  else if (count > 100 ){
	  amount = Math.ceil(count* 500)
	  }
	  else if (count == 0 && Meteor.user().geld<200 ){
	  amount = 1;
	  }
	  else {
		  var amount = 100
	  }
	  
	  
	   if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }

		
		if(isNaN(group)) {
			group= getRandomInt(1,groups.length)
			console.log("bought "+groupnames[group-1])
		}
    
    if (Meteor.user().geld >= amount && amount > 0){
		var currentUser = Meteor.userId();
		

	  var rare=eggrarity(0)-1
	
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
    },function(err,derp){
    
	Meteor.users.update({_id:currentUser},{
		$set:{
			
		'recentid': derp,
		'recentname': cfl(gen.group)+" Egg",
		'recent': "/cutethings/"+gen.group+"/0.1",
		
		
		}
	})
	
	

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
		
		
		throw new Meteor.Error("nogeld", "Not Enough Geld");
	}

  },
  
  buyslot: function() {
	  
	  
	  var currentUser = Meteor.userId();
	
	   if(!currentUser){
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
		  var amount=1000*(Meteor.user().slots+1)
	
		
		
		
    
    if (Meteor.user().geld >= amount && amount > 0){
		var currentUser = Meteor.userId();
		

	  
	 
	  
	  
	
	
      Meteor.users.update({
        _id: this.userId
      }, {
        $inc: {
          
          
          'geld': (0 - amount),
		  'slots': 1,
        },
		 $set: {
        'msg': "One Breeding slot purchased.",
        

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



function passivegain() {
	var  champ = Meteor.users.findOne({}, {
      sort: {
        'geld': -1,
		
      },
	  
	  limit: 1
	  
    })._id
	
	  Meteor.users.find({}).map(function(user) {
        Meteor.users.update({
          _id: user._id
        }, {
          $inc: {
            'geld': 1,
            
          },



        })
      });
	  
	  Meteor.users.update({
          _id: champ
        }, {
          $inc: {
            'geld': 0,
            
          },



        });
	  
	  breeding.find({ user: {$ne:champ} }).map(function(pair) {
		  if (pair.exp < pair.maxexp) {
        breeding.update({
          _id: pair._id
        }, {
          $inc: {
            'exp': 10,
            
          },



        })
		  };
      });
	  
	  cutethings.find({ user : {$ne:champ }}).map(function(user) {
		  if (user.exp < user.max ) {
        cutethings.update({
          _id: user._id
        }, {
          $inc: {
            'exp': 5,
            
          },



        })
		  }
      });
	  
	 
	  
        
      




	
  
    
	
   
}

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

  function deletechat() {
	  
var Old = new Date()
Old.setMinutes(Old.getMinutes()-60)
chat.remove({datefield: {$lt:Old}})
  
}


function botmsg() {
	var genmsg= getRandomInt(1,7)
	if (genmsg == 1) {
	chat.insert({
		datefield: new Date(),
		msg: "You can (not) redo.",
        
        user: "eva001",
		username: "redacted",
		
    });
	}
	else if (genmsg == 2) {
	chat.insert({
		datefield: new Date(),
		msg: "I mustn't run away",
        
        user: "eva001",
		username: "redacted",
		
    });
	}
	else if (genmsg == 3) {
	chat.insert({
		datefield: new Date(),
		msg: "Mankind’s greatest fear is Mankind itself..",
        
        user: "eva001",
		username: "redacted",
		
    });
	}
	else if (genmsg == 4) {
	chat.insert({
		datefield: new Date(),
		msg: "Your truth can be changed simply by the way you accept it. That's how fragile the truth for a human is.",
        
        user: "eva001",
		username: "redacted",
		
    });
	}
	else if (genmsg == 5) {
	chat.insert({
		datefield: new Date(),
		msg: "Any new position from which you view your reality will change your perception of its nature. It's all literally a matter of perspective.",
        
        user: "eva001",
		username: "redacted",
		
    });
	
	}
	else if (genmsg == 6) {
	chat.insert({
		datefield: new Date(),
		msg: "Humans cannot create from nothingness. Humans cannot accomplish anything without holding on to something. Humans are not gods.",
        
        user: "eva001",
		username: "redacted",
		
    });
	}
	else  {
	chat.insert({
		datefield: new Date(),
		msg: "Man fears the darkness, and so he scrapes away at the edges of it with fire.",
        
        user: "eva001",
		username: "redacted",
		
    });
	}
	
}
