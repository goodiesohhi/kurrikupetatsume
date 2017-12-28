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


egggroup= [bunnyegg,reptileegg]
//placements

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
[serpentine,],
];





groups=[leporine,reptile];


//evos


evoleporine=[
//rare1
bunnyegg,bunnyball,ballooney,rabblimp,

];

evoreptile=[
reptileegg,serpentine,boweniteconstrictor,snek
];

evogroups=[evoleporine,evoreptile];

//petscripts

 petscripts = {
  Bunnyball: function () {   
  gen1 = getRandomInt(1,5)
  gen2 = getRandomInt(1,5)
  gen3 = getRandomInt(1,5)
  if (gen1==gen2&&gen2==gen3){
  return getRandomInt(6);
  } else {
	  return gen3;
  }

  },
  Serpentine: function () {return 1; },
  Snek: function () {return 1;  },
  placeholder4: function () { alert('Function 4'); },
  placeholder5: function () { alert('Function 5'); }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}