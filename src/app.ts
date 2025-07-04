import express, { Application, Request, Response } from "express";
import cors from "cors";
import bookRoutes from "./routes/book.route";
import borrowRoutes from "./routes/borrow.route";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://booknest-by-safi.vercel.app"],
  })
);

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management API is running");
});

export default app;
