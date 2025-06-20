import express, { Application, Request, Response } from "express";
import cors from "cors";
import bookRoutes from "./routes/book.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management API is running");
});

export default app;
