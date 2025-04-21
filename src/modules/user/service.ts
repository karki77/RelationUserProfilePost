import { PrismaClient } from "@prisma/client";


import HttpException from "../../utils/api/httpException";
import { generateToken, UserRole } from "../../utils/middleware/authMiddleware";
import { hashPassword, verifyPassword } from "../../utils/password/hash";


import type { IRegisterSchema, ILoginSchema} from "./validation";
export const prisma = new PrismaClient();

/**
 * Private -> user by ID. 
 */


// data : IRegisterSchema
export const registerUserService = async (data: IRegisterSchema) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email}
  });
  
  if (existingUser) {
    throw new HttpException(400, "Email already exist")
  }
  
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
    data:{
       username: data.username,
      email: data.email,
      password: hashedPassword,  
      role:'MANAGER'
    }
  })
};

export const getAllUsersService = async () => {
  return prisma.user.findMany({ include: { profile: true, posts: true } });
};

// here i need to  add the login service
export const loginUserService = async (data: ILoginSchema) => {
  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  // If no user found, throw error
  if (!user) {
    throw new HttpException(401, "Invalid email or password");
  }

  // Compare password using Argon2
  const isPasswordValid = await verifyPassword(data.password, user.password);
  
  if (!isPasswordValid) {
    throw new HttpException(401, "Invalid email or password");
  }

// Generate JWT token
const token = generateToken({
  id: user.id,
  email: user.email,
  role: UserRole.ADMIN
});
  
    // Return user (without password) and token
  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    },
    token
  };
};

// export const loginUserService = async (data: IloginSchema) => {
//   const user = await prisma.user.findUnique({
//     where: { email: data.email },
//   });

//   if (!user) {
//     throw new HttpException(400, "Invalid email or password");
//   }

//   // Assuming you have a function to compare passwords
//   const isMatch= await argon2.hash(password, data.password);

//   if (!isPasswordValid) {
//     throw new HttpException(400, "Invalid email or password");
//   }

//   return user;
// }





  // relation -> finished
// middleware -> validation, authenticate, role middleware, 

// global
// api response
// validation.