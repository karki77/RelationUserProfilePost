import { PrismaClient } from "@prisma/client";
import { toValidUserRole } from "../../utils/roleUtils";
import HttpException from "../../utils/api/httpException";
import { generateToken} from "../../utils/middleware/authMiddleware";
import { hashPassword, verifyPassword } from "../../utils/password/hash";
import { UserRole } from "@prisma/client";


import type { IRegisterSchema, ILoginSchema} from "./validation";
export const prisma = new PrismaClient();


export const registerUserService = async (data: IRegisterSchema) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username }
      ]
    }
  });

  if (existingUser) {
    if (existingUser.email === data.email) {
      throw new HttpException(400, "Email already exists");
    }
    if (existingUser.username === data.username) {
      throw new HttpException(400, "Username already exists");
    }
  }

  const hashedPassword = await hashPassword(data.password);

  return await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role
    }
  });
};


export const getAllUsersService = async () => {
  return await prisma.user.findMany({ include: { profile: true, posts: true } });
};

// here i need to  add the login service
export const loginUserService = async (data: ILoginSchema) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new HttpException(401, "Invalid credentials");
  }

  // Compare password using Argon2
  const isPasswordValid = await verifyPassword(data.password, user.password);
  
  if (!isPasswordValid) {
    throw new HttpException(401, "Invalid credentials");
  }

// Generate JWT token
const token = generateToken({
  id: user.id,
  email: user.email,
  role: user.role
});

// 
  
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