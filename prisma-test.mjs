import "dotenv/config";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  await prisma.$connect();
  console.log("Connected to database!");
}

main();
