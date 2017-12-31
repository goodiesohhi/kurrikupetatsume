//pets
//leporine
bunnyegg = {group:"leporine", dex:0,name:"Leporine Egg",evo:0,exp:0,max:200,rarity:1,gnumber:1};
bunnyball = {group:"leporine", dex:1, name:"Bunnyball",evo:2,exp:0,max:400,rarity:1,gnumber:1};
ballooney = {group:"leporine", dex:2, name:"Ballooney",evo:3,exp:0,max:1700,rarity:1,gnumber:1};
rabblimp = {group:"leporine", dex:3, name:"Rabblimp",evo:'none',exp:0,max:NaN,rarity:1,gnumber:1};
//reptile 
reptileegg = {group:"reptile", dex:0,name:"Reptillian Egg",evo:0,exp:0,max:100,rarity:1,gnumber:2};

serpentine = {group:"reptile", dex:1,name:"Serpentine",evo:1,exp:0,max:5000,rarity:5,gnumber:2};
boweniteconstrictor = {group:"reptile", dex:2,name:"Bowenite Constrictor",evo:'none',exp:0,max:NaN,rarity:5,gnumber:2};
snek = {group:"reptile", dex:3,name:"Snek",evo:'none',exp:0,max:NaN,rarity:1,gnumber:2};
fanguine = {group:"reptile", dex:4,name:"Fanguine",evo:'5',exp:0,max:300,rarity:5,gnumber:2};
dracihpo = {group:"reptile", dex:5,name:"Dracihpo",evo:'6',exp:0,max:1200,rarity:5,gnumber:2};
ophicard = {group:"reptile", dex:6,name:"Ophicard",evo:'none',exp:0,max:NaN,rarity:5,gnumber:2};

//avian
avianegg = {group:"avian", dex:0,name:"Birdie Egg",evo:0,exp:0,max:60,rarity:1,gnumber:3};
turken = {group:"avian", dex:1,name:"Turken",evo:2,exp:0,max:100,rarity:1,gnumber:3};
grouster = {group:"avian", dex:2,name:"Grouster",evo:3,exp:0,max:300,rarity:1,gnumber:3};
peacockatrice= {group:"avian", dex:3,name:"Peacockatrice",evo:'none',exp:0,max:NaN,rarity:1,gnumber:3};

//fishies
fishyegg = {group:"fishies", dex:0,name:"Fishy Egg",evo:0,exp:0,max:50,rarity:1,gnumber:4};
phish = {group:"fishies", dex:1,name:"Phish",evo:2,exp:0,max:120,rarity:1,gnumber:4};
finposter = {group:"fishies", dex:2,name:"Finposter",evo:3,exp:0,max:809,rarity:1,gnumber:4};
ripoff = {group:"fishies", dex:3,name:"Ripoff",evo:'none',exp:0,max:NaN,rarity:1,gnumber:4};

egggroup= [bunnyegg,reptileegg,avianegg,fishyegg]
//placements

avian=[
//rare1
[turken,],
//rare2
[turken,],
//rare3
[turken,],
//rare4
[turken,],
//rare5
[turken,],
];

fishies=[
//rare1
[phish,],
//rare2
[phish,],
//rare3
[phish,],
//rare4
[phish,],
//rare5
[phish,],
];

leporine=[
//rare1
[bunnyball,],
//rare2
[bunnyball,],
//rare3
[bunnyball,],
//rare4
[bunnyball,],
//rare5
[bunnyball,],
];

reptile=[
//rare1
[snek,],
//rare2
[snek,],
//rare3
[snek,],
//rare4
[snek,],
//rare5
[serpentine,fanguine],
];





groups=[leporine,reptile,avian,fishies];


//evos


evoleporine=[
//rare1
bunnyegg,bunnyball,ballooney,rabblimp,

];

evofishies=[
//rare1
fishyegg,phish,finposter,ripoff,

];

evoreptile=[
reptileegg,serpentine,boweniteconstrictor,snek,fanguine,dracihpo,ophicard,
];



evoavian=[
avianegg,turken,grouster,peacockatrice,
];


evogroups=[evoleporine,evoreptile,evoavian,evofishies];

//petscripts

 petscripts = {
  Bunnyball: function () {   
  gen1 = getRandomInt(1,5)
  gen2 = getRandomInt(1,5)
  gen3 = getRandomInt(1,5)
  if (gen1==5&&gen2==gen1&&gen2==gen3){
  return 6;
  } else {
	  return gen3;
  }

  },
  Serpentine: function () {return 1; },
  Snek: function () {return 1;  },
  Fanguine: function () { return 1; },
  Turken: function () { return 1; },
  Phish: function () { return 1; },
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}