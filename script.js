let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Palo"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterImage = document.querySelector("#imgM");
const weapons = [
  { name: 'Palo', power: 5 },
  { name: 'Daga', power: 30 },
  { name: 'Martillo de carpintero', power: 50 },
  { name: 'Espada', power: 100 }
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
    img: "img/slime.jpg"
  },
  {
    name: "Bestia con colmillos",
    level: 8,
    health: 60,
    img: "img/wolf.jpg"
  },
  {
    name: "Dragon",
    level: 20,
    health: 300,
    img: "img/dragon.jpg"
  }
]
const locations = [
    {
        name: "Plaza de la cuidad",
        "button text": ["Ir a la Tienda", "Ir a la Cueva", "Pelear con el Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "Estás en la plaza del pueblo. Tu puedes ver la el cartel que dice \"Tienda\"."
    },
    {
        name: "Tienda",
        "button text": ["Comprar 10 de vida (10 Oro)", "Comprar Arma (30 Oro)", "Ir a la plaza de la cuidad"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Entraste a la tienda."
    },
    {
        name: "Cueva",
        "button text": ["Pelear con el Slime", "Pelear con la Bestia con colmillos ", "Ir a la plaza de la cuidad"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "Estas en la cueva. Puedes ver algunos monstruos."
    },
    {
        name: "Pelear",
        "button text": ["Atacar", "Esquivar", "Huir"],
        "button functions": [attack, dodge, goTown],
        text: "Estas peleado con un monstruos."
    },
    {
        name: "Monstruo Eliminado",
        "button text": ["Ir a la plaza de la cuidad", "Ir a la plaza de la cuidad", "Ir a la plaza de la cuidad"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'El monstruo grita "¡Arg!" al morir. Ganas puntos de experiencia y encuentras oro.'
    },
    {
        name: "Perdiste",
        "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"],
        "button functions": [restart, restart, restart],
        text: "Te moriste. ☠️"
    },
    { 
        name: "Ganaste", 
        "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"], 
        "button functions": [restart, restart, restart], 
        text: "¡Venciste al dragón! ¡GANAS EL JUEGO!🎉" 
    },
    {
        name: "Sorpresa",
        "button text": ["2", "8", "Ir a la plaza de la cuidad?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "Encuentras un juego secreto. Elige un número arriba. Se elegirán al azar diez números entre 0 y 10. Si el número que eliges coincide con uno de los números aleatorios, ¡ganas!"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  monsterImage.style.display = "none"
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "No tienes suficiente oro para comprar salud.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Ahora tenes " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En tu inventario tenes: " + inventory;
    } else {
      text.innerText = "No tienes suficiente oro para comprar un arma.";
    }
  } else {
    text.innerText = "¡Ya tienes el arma más poderosa!";
    button2.innerText = "Vender arma por 15 de oro";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vendiste " + currentWeapon + ".";
    text.innerText += " En tu inventario tenes: " + inventory;
  } else {
    text.innerText = "No vendas tu unica arma, tonto!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterImage.setAttribute("src", monsters[fighting].img);
  monsterImage.style.display = "block";
  
}

function attack() {
  text.innerText = monsters[fighting].name + " Esta atacando.";
  text.innerText += " Estas atacando usando tu " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Fallaste.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " se rompio.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Esquivaste el ataque de " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Palo"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Elegiste el numero " + guess + ". Aca estan los numero que salieron:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Le atinaste! Ganaste 20 de oro!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Fallaste! Perdes 10 de vida!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}