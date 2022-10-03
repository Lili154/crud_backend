import sqlite3 from "sqlite3";
sqlite3.verbose()
const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.log(err);
})
let sql
sql = "CREATE TABLE IF NOT EXISTS data(id INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT, userSurname TEXT, userSalary INTEGER)"
db.run(sql)
export const getUser = (req, res) => {
    db.all("SELECT * FROM data", (err, rows) => {
        res.send(rows);
    })

}

export const createUser = (req, res) => {
    const user = req.body;
    sql = "INSERT INTO data(userName, userSurname , userSalary) VALUES(?,?,?)"
    db.run(sql, user["userName"], user["userSurname"], user["userSalary"])
    res.send("created");
}

export const deleteUser = (req, res) => {
    const id = req.params.id;
    sql = "DELETE FROM data WHERE id = ?"
    db.run(sql, id)

    res.send(`User with the id ${id} deleted from the database.`);
}
export const updateUser = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    sql = `UPDATE data SET userName = ?, userSurname = ?, userSalary = ? WHERE id = ${id}`
    db.run(sql, user["userName"], user["userSurname"], user["userSalary"])
    res.send(`User with the id ${id} has been updated`);

}