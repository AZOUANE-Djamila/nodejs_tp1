module.exports = function(app,mysql){

//#region API DES EMPLOYES

app.get("/api/employes", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'SELECT * FROM employees',
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de chargement des employés")
            }
            rep.json(results)
        }
      );
    //connection.destroy()
})

app.get("/api/employes/:id", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'SELECT * FROM employees where employeeNumber = ?', [req.params.id],
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de chargement de l'employé")
            }
            if (results.length == 0){
                rep.status(404).end() 
                return;
            }
            rep.json(results)

        }
      );
    //connection.destroy()
})

app.post("/api/employes", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'insert into employees set ?', [req.body],
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de création de l'employé")
            }
            rep.status(201).json([message="OK"])
        }
      );
    //connection.destroy()
})

app.put("/api/employes/:id", function(req, rep){
    if (req.body.employeeNumber)
       rep.status(400).end("ERREUR")
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'update employees set ? where employeeNumber = ?', 
        [req.body, req.params.id],
        function(err, results) { 
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de création de l'employé")
            }
            rep.status(201).json([message="L'employé est modifié avec succès !"])
        }
      );
    //connection.destroy()
})


app.delete("/api/employes/:id", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'delete from employees where employeeNumber = ?', [req.params.id],
        function(err, results) { 
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de création de l'employé")
            }
            rep.status(204).end()
        }
      );
    //connection.destroy()
})

//#endregion 


}