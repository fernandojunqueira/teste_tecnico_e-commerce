import mysql from "mysql2";


// import mysql from "mysql"

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "db_market"
})

