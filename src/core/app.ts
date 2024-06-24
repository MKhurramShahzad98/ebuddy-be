// core/app.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "../routes/userRoutes";
import { ApiError } from "../entities/apiErrors";
import authRoutes from '../routes/authRoutes';
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);

app.use(
  (
    err: ApiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.statusCode || 500).send({
      message: err.message || "Internal Server Error",
    });
  }
);

app.listen(4000, () => console.log("Up & RUnning *4000"));

export default app;
