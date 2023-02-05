//1. list t-shirts - json, unique product
//2. diff between get & post, admin: form to add t-Shirt

// This is for Import
const express = require("express");
const app = express();
const path = require("path");
const trendingTShirts = require("./product-list");
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(8888, () => console.log("Express Server started at 8888 "));

app.get("/product/trending", (req, resp) => {
  resp.status(200);
  // resp.json(trendingTShirts);
  resp.render("trendingView", { tShirts: trendingTShirts });
});

app.get("/product/:productId", (req, resp) => {
  resp.status(200);
  console.log("productId:" + req.params.productId);
  //   resp.json(trendingTShirts[req.params.productId - 1]);
  resp.render("productDetailView", {
    tShirt: trendingTShirts[req.params.productId - 1],
  });
});

app.get("/admin/new", (req, resp) => {
  resp.sendFile(__dirname + "/public/new-product.html");
});

app.post("/admin/addProduct", (req, resp) => {
  //collect all info, prepare tshirt, tShirt update list
  const body = req.body;
  const tShirt = {
    id: trendingTShirts.length + 1,
    color: body.color,
    size: body.size,
    quote: body.quote,
    price: body.price,
  };
  trendingTShirts.push(tShirt);
  resp.send("Added tShirt with Quote: " + tShirt.quote);
});
