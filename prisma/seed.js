const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const defaultHashedPassword = bcrypt.hashSync('password123', 10);
  const john = {
    email: 'john@doe.com',
    name: 'John Doe',
    hashedPassword: defaultHashedPassword,
  }

  const bill = {
    email: 'bill@gates.com',
    name: 'Bill Gates',
    hashedPassword: defaultHashedPassword,
  }

  const trump = {
    email: 'trump@david.com',
    name: 'Trump David',
    hashedPassword: defaultHashedPassword,
  }

  // Create users
  const createdJohnUser = await prisma.user.create({
    data: john
  });

  const createdBillUser = await prisma.user.create({
    data: bill
  });

  const createdTrumpUser = await prisma.user.create({
    data: trump
  });

  const johnWeapons = [
    { name: 'Sword 1', level: 1, attack: 10, durability: 50, userId: createdJohnUser.id  },
    { name: 'Sword 2', level: 2, attack: 15, durability: 60, userId: createdJohnUser.id  },
    { name: 'Sword 3', level: 3, attack: 20, durability: 70, userId: createdJohnUser.id  },
    { name: 'Sword 4', level: 4, attack: 25, durability: 80, userId: createdJohnUser.id  },
    { name: 'Sword 5', level: 5, attack: 30, durability: 90, userId: createdJohnUser.id  },
  ];

  await prisma.weapon.createMany({
    data: johnWeapons
  });

  const billWeapons = [
    { name: 'Shield 1', level: 1, attack: 5 , durability: 70, userId:  createdBillUser.id },
    { name: 'Shield 2', level: 2, attack: 7 , durability: 80, userId:  createdBillUser.id },
    { name: 'Shield 3', level: 3, attack: 9 , durability: 90, userId:  createdBillUser.id },
    { name: 'Shield 4', level: 4, attack: 11, durability: 100, userId: createdBillUser.id  },
    { name: 'Shield 5', level: 5, attack: 15, durability: 110, userId: createdBillUser.id  },
  ];

  await prisma.weapon.createMany({
    data: billWeapons
  });

  const trumpWeapons = [
    { name: 'Lancer 1', level: 1, attack: 2 , durability: 40, userId: createdTrumpUser.id },
    { name: 'Lancer 2', level: 2, attack: 10, durability: 50, userId: createdTrumpUser.id  },
    { name: 'Lancer 3', level: 3, attack: 18, durability: 60, userId: createdTrumpUser.id  },
    { name: 'Lancer 4', level: 4, attack: 26, durability: 70, userId: createdTrumpUser.id  },
    { name: 'Lancer 5', level: 5, attack: 32, durability: 80, userId: createdTrumpUser.id  },
  ];

  await prisma.weapon.createMany({
    data: trumpWeapons
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
