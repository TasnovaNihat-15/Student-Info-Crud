const express = require ("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "crud"
})

app.get("/",(req,res)=>{
   const sql = "SELECT * FROM student";
   db.query(sql,(err,data)=>{
    if(err) {
      console.log(err); 
      return res.json("Error");
    }
    return res.json(data);
   })
})



app.post("/create", (req, res) => {
    console.log("Body:", req.body);

    const sql = "INSERT INTO student (name, email) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log("Inserted Successfully");
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    console.log("Body:", req.body);

   const sql = "Update student set Name = ? Email = ? where ID = ? ";
    const values = [req.body.name, req.body.email];
    const id = req.params.id;

    db.query(sql, [...values,id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log("Inserted Successfully");
        return res.json(result);
    });
});

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, ()=>{
   console.log("listening") ;
})
