import express from 'express';
import dotenv from 'dotenv';
import router from './Router/authRouter';
 import {PrismaClient} from '@prisma/client';


 const prisma = new PrismaClient();

dotenv.config();
const PORT = process.env.PORT ?? 3000;
const app = express();



void (async (): Promise<void> => {
    try {
      // CONNECT DATABASE
      await prisma.$connect();
      
      console.log("Database connected successfully.");

} catch (error) {
    // eslint-disable-next-line no-console
    console.log(`ERROR CONNECTING DATABASE: ${(error as Error).message}`);
    console.error(error);
    process.exit(1);
  }
})();

app.use(express.json());


app.use("/api/v1", router)
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

