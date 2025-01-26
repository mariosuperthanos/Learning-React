import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // const createdUser = await prisma.user.create({
  //   data: {
  //     name: "David",
  //     email: "gfgaaga@gmail.com",
  //     userPreference: {
  //       create: {
  //         emailUpdates: true,
  //       },
  //     },
  //   },
  // });

  const deletedUser = await prisma.user.delete({
    where: {
      name: "David",
    },
  });

  console.log(deletedUser);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
