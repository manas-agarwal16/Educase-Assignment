import express from "express";
import cors from "cors";
import schoolRouter from "./routes/school.routes.js";

const app = express();

const origin = process.env.CORS_ORIGIN;

app.use(cors({ origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
        <h2>Hello Educase India Team</h2>
        <p>To test the APIs, use the following endpoints:</p>
        <ul>
          <li><strong>Add a School:</strong> <br> 
            <code>POST https://educase-assignment-1-bju1.onrender.com/addSchool</code>
          </li>
          <li><strong>List Schools Near a Location:</strong> <br> 
            <code>GET https://educase-assignment-1-bju1.onrender.com/listSchools/:userLongitude/:userLatitude</code>
          </li>
        </ul>
        <p>Replace <code>:userLongitude</code> and <code>:userLatitude</code> with actual coordinates.</p>
      `);
});

// Route Handler
app.use(schoolRouter);

export { app };
