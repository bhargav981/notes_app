const express = require("express");
const app = express();
const connection = require('./db')
const cors = require('cors')
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/notes', (req, res) => {
  // try {
  //   const rows = await connection.query('SELECT * from notes');
  //   res.send(rows);
  //   await connection.end();
  //   } catch (err) {
  //     next(err);
  //   }
  const sql = "SELECT * from notes";
    connection.query(sql, function (err, notes) {
        if (err) throw err;
        res.send(notes);
      });
})

app.get('/info/:title', (req, res) => {
  const sql = `SELECT body, tags FROM notes WHERE title='${req.params.title}'`;
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
      });
})

app.post('/addNotes',(req,res)=>{
  console.log(req)
  let title = req.body.title;
  let body = req.body.body;
  let tags = req.body.tags;
  let sql = "INSERT INTO notes(title,body,tags) VALUES('" + title + "' , '" + body + "' , '" + tags + "')";
  connection.query(sql, function (err, notes) {
        if (err) throw err;
        res.send(notes);
        console.log("Added Row(s):", notes.affectedRows);
      });
})

app.delete("/delete/:title", (req, res) => {
  let sql = `DELETE FROM notes WHERE title = '${req.params.title}'`;
  connection.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    console.log("Deleted Row(s):", results.affectedRows);
  });
});

app.put("/update/:title", (req,res) => { 
  let body = req.body.body;
  let tags = req.body.tags;
  let sql = `UPDATE notes SET body = ?, tags = ? WHERE title = '${req.params.title}'`;
    connection.query(sql, [body, tags], (err, results, fields) => {
        if (err) throw err;
        res.send(results);
        console.log("Updated Row(s):", results.affectedRows);
      });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})