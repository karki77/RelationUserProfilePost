// import { PrismaClient, UserRole } from '@prisma/client';
import argon from 'argon2';

// const prisma = new PrismaClient();

// export const seedSuperAdmin = async () => {
//     console.log("------------------")
//     const superAdminEmail = 'superadmin@example.com';

  // const existing = await prisma.user.findUnique({
  //   where: { email: superAdminEmail }
  // });

//   console.log(existing, "----------------------")

  // if (existing) {
  //   console.log('Super Admin already exists.');
  //   return;
  // }
//   console.log("------------------")

//   const hashedPassword = await argon.hash('SuperSecret123!');
//   console.log("------------------")

  // await prisma.user.create({
  //   data: {
  //     username: 'Super Admin',
  //     email: superAdminEmail,
  //     password: hashedPassword,
  //     role: UserRole.SUPERADMIN,
  //   }
  // });

//   console.log('Super Admin seeded successfully!');
// };



import { PrismaClient, UserRole } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const isAlreadyExist = await prisma.user.findUnique({
    where: { email: "superadmin@gmail.com" }
  });

  if (isAlreadyExist) {
    console.log('Super Admin already exists.');
    return;
  }
  
  const hashedPassword = await argon.hash('Pass@123');
  await prisma.user.create({
    data: {
      username: 'Super Admin',
      email: "superadmin@gmail.com",
      password: hashedPassword,
      role: UserRole.SUPERADMIN,
    }
  });
  console.log("Super admin  created successfully")

 
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })