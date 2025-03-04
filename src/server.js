require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const apiRoutes = require("./routes/api");
const connection = require("./config/database");
const { getHomepage } = require("./controllers/homeController");
const app = express();
const cors = require("cors");
const { getAccess_token, blackList } = require("./middlewares/auth");
const port = process.env.PORT || 8888;
//config req.body

app.use(cors());
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

//khai báo route
app.all("*", getAccess_token);
app.use("/api/v1/", apiRoutes);
app.get("/", getHomepage);

(async () => {
  try {
    //using mongoose
    await connection();

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
