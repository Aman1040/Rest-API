const express = require("express");
const data = require("./MOCK_DATA.json");
const fs = require("fs");
const port = 8000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.get("/api/users", (req, res) => {
  return res.json(data);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${data.map((item) => `<li>${item.first_name}</li>`).join("")}
    </ul>
    `;
  return res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.find((item) => item.id === id);
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  data.push({ ...body, id: data.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, res) => {
    return res.json({ status: "pending" });
  });
  return res.json({ status: "pending" });
});

app.listen(port, () => {
  console.log("Port is listening at port number 8000");
});
