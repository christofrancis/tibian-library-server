const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

//importing routes
const bookRoutes = require("./routes/book");
const donatorRoutes = require("./routes/donator");
const contributorRoutes = require("./routes/contributor");
const authorizationRoutes = require("./routes/authorization");
const doc_and_paperRoutes = require("./routes/doc_and_paper");

//app
const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: true,
  })
);

//routes middleware
app.use("/api", bookRoutes);
app.use("/api", donatorRoutes);
app.use("/api", contributorRoutes);
app.use("/api", authorizationRoutes);
app.use("/api", doc_and_paperRoutes);

//listening port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
