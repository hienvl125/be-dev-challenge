const prismaClient = require('../prisma-client');

const ListWeapons = async ({ userId, page, perPage }) => {
  const weapons = await prismaClient.weapon.findMany({
    where: {
      userId
    },
    skip: (page - 1) * perPage,
    take: perPage
  });

  const totalItems = await prismaClient.weapon.count({
    where: {
      userId
    }
  });

  const totalPages = Math.ceil(totalItems / perPage);
  const isLast = page >= totalPages;

  return {
    items: weapons,
    pagination: {
      totalPages,
      totalItems,
      isLast,
      page,
      perPage,
    },
  };
}

const CreateWeapon = async ({ userId, name, attack, durability, level }) => {
  const weapon = await prismaClient.weapon.create({
    data: {
      userId,
      name,
      attack,
      durability,
      level,
    }
  });

  return weapon;
}

const FindWeaponById = async ({ userId, weaponId }) => {
  const weapon = await prismaClient.weapon.findFirst({
    where: {
      id: weaponId,
      userId
    }
  });
  return weapon;
}

const UpdateWeapon = async ({ userId, weaponId, name, attack, durability, level }) => {
  const updatedWeapon = await prismaClient.weapon.update({
    where: {
      id: weaponId,
      userId: userId
    },
    data: {
      name,
      attack,
      durability,
      level,
    }
  });
  return updatedWeapon;
}

const DeleteWeapon = async ({ userId, weaponId }) => {
  const deletedWeapon = await prismaClient.weapon.delete({
    where: {
      id: weaponId,
      userId: userId,
    }
  });
  return deletedWeapon;
}

module.exports = {
  ListWeapons,
  CreateWeapon,
  FindWeaponById,
  UpdateWeapon,
  DeleteWeapon
}
