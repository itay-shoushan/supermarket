import express, { Request, Response, NextFunction, Error } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initDB } from "./config/database_config";
import dotenv from "dotenv";
import authRouter from "./api/routes/auth"
import productsRouter from "./api/routes/products"
import cartsRouter from "./api/routes/carts"
import { verifyTokenMiddleware } from "./api/middlewares/verifyToken";



dotenv.config();
initDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/healthcheck", async (req: Request, res: Response) => {
    return res.send("Api is working!");
});

app.use("/auth", authRouter);
app.use(verifyTokenMiddleware)
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        if (error?.message) res.status(500).json({ message: error?.message });
        else return res.status(500).json({ message: "something went wrong" });
    }
});

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`api listening to port ${PORT}`);
});

