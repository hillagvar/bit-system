import express, { Application } from "express";
import { authRouter } from "./routes/auth.router";
import { corsHeaders } from "./middleware/cors.middleware";
import { coursesRouter } from "./routes/courses.router";
import { groupsRouter } from "./routes/groups.router";
import { studentRouter } from "./routes/student.router";
import { lecturesRouter } from "./routes/lectures.router";

const app: Application = express();

// app.use(express.urlencoded());

app.use(express.json());

app.use(corsHeaders);

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/groups", groupsRouter);
app.use("/lectures", lecturesRouter);
app.use("/student", studentRouter);


export { app };