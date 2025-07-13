import { PrismaClient } from '../generated/prisma'; // or '@prisma/client' if you're using default path

const prismaClient = new PrismaClient();
export default prismaClient;
