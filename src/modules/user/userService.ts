import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

// data : IRegisterSchema
export const createUserService = async (data: { email: string; password: string }) => {
    // user username not found
  // username -> already exist 
    return prisma.user.create({ data });
};

export const getAllUsersService = async () => {
  return prisma.user.findMany({ include: { profile: true, posts: true } });
};


// relation -> finished
// middleware -> validation, authenticate, role middleware, 