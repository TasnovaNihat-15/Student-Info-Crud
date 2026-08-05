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



app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (name, email) VALUES (?, ?)";

    const values = [
        req.body.name,
        req.body.email
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }

        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET name = ?, email = ? WHERE id = ?";

    db.query(
        sql,
        [req.body.name, req.body.email, req.params.id],
        (err, result) => {
            if (err) return res.json(err);
            return res.json(result);
        }
    );
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.listen(8081, ()=>{
   console.log("listening") ;
})
