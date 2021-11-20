//#region  REQUIRE
var expess = require("express")
var bodyparser =require("body-parser")
const mysql = require('mysql2');
//#endregion

//#region CONFIGURATION
var app = expess()
app.use(expess.static("public")) // traiter les fichiers statiques: ASSETS (HTML, CSS, JS)
app.set("view engine", "vash")
/*app.get('emp/liste', function (req, res) {

    res.render('liste', { title: 'Vash Template Demo', 
                          content:'This is dummy paragraph.'});

});*/
/*app.get('/modifier', function (req, res) {

    res.render('modifier', { title: 'Vash Template Demo', 
                          content:'This is dummy paragraph.'});

});*/
app.use(bodyparser.json())  // récupérer les données JSON envoyées
app.use(bodyparser.urlencoded({extended:true})) // récupérer les données FORMULAIRES envoyés
//#endregion


app.get("/user", function(req,rep){
    var user = { usr : req.query.nom, pwd : req.query.pass}
    console.log(JSON.stringify(user))
    rep.json(user) // rep.end(JSON.stringify(user))
})
app.post("/user", function(req,rep){
    var user = { usr : req.body.nom, pwd : req.body.pass}
    console.log(JSON.stringify(user))
    rep.json(user) 
})
app.put("/user/:id", function(req,rep){
    var id = req.params.id
    console.log(`id reçu est ${id}`)
    rep.end(`id reçu est ${id}`) 
})

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

//#region API DES table offices

app.get("/api/offices", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'SELECT * FROM offices',
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de chargement des offices")
            }
            rep.json(results)
        }
      );
    //connection.destroy()
})

app.get("/api/offices/:id", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'SELECT * FROM offices where officeCode = ?', [req.params.id],
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de chargement de l'office")
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

app.post("/api/offices", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'insert into offices set ?', [req.body],
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de création de l'office")
            }
            rep.status(201).json([message="OK"])
        }
      );
    //connection.destroy()
})

app.put("/api/offices/:id", function(req, rep){
    if (!req.body.officeCode)
       rep.status(400).end("ERREUR")
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        `update offices set ? where officeCode = ?`, 
        [req.body, req.params.id],
        function(err) { 
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de modification de l'office")
            }
            rep.status(201).json([message="L'office est modifié avec succés !"])
        }
      );
    //connection.destroy()
})


app.delete("/api/offices/:id", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'delete from offices where officeCode = ?', [req.params.id],
        function(err, results) { 
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de création de l'office")
            }
            rep.status(204).end()
        }
      );
    //connection.destroy()
})

//#endregion 


//#region VIEW EMPLOYES
app.get("/employes.html", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'SELECT * FROM employees',
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de chargement des employés")
            }
            
            rep.render("emp/index", {donnees:results})
        }
      );
    //connection.destroy()
})
app.get('/emp/ajouter', function (req, rep) {
    rep.render('emp/ajouter'); // afficher un formulaire vide
});
app.post('/emp/ajouter', function (req, rep) {
    var con = mysql.createConnection({
        host: "localhost", user: "root",
        password: "", database: "classicmodels"
    });
    con.connect(function (err) {
        if (err)
            throw err;
        let sql = "insert into employees set ?";
        con.query(sql, [req.body], function (err, result) {
            if (err)
                throw err;
            
            rep.redirect('/employes.html');
        });
    });
});
app.get('/emp/modifier/:id', function (req, rep) {
    var con = mysql.createConnection({
        host: "localhost", user: "root",
        password: "", database: "classicmodels"
    });
    con.connect(function (err) {
        if (err)
            throw err;
        let sql = `select * from employees where employeeNumber = ?`;
        con.query(sql, req.params.id, function (err, result) {
            if (err)
                throw err;
            console.log(JSON.stringify(result));
            rep.render('emp/modifier', { donnees: result[0] });
        });
    });
});
app.post('/emp/modifier/:id', function (req, rep) {
    const con = mysql.createConnection({
        host: "localhost", user: "root",
        password: "", database: "classicmodels"
    });
    con.connect(function (err) {
        if (err)
            throw err;
       
        let sql = `update employees set ? where employeeNumber = ?`;
        con.query(sql, 
            [req.body,req.params.id], 
            function (err, result) {
            if (err)
                throw err;
            console.log(JSON.stringify(result));
            });
    });
    rep.redirect("/employes.html")
});

app.get("/emp/supprimer.html", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'delete from employees where employeeNumber = ?', [req.query.num],
        function(err, results) { 
            if (err) { 
                rep.redirect("/employes.html?DEL=KO")
            }
            rep.redirect("/employes.html?DEL=OK")
        }
      );
})
//#endregion


//#region VIEW OFFICES
app.get("/offices.html", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'SELECT * FROM offices',
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de chargement des employés")
            }
            
            rep.render("ofc/liste", {donnees:results})
        }
      );
    //connection.destroy()
})

app.post("/offices", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'insert into offices set ?', [req.body],
        function(err, results) {
            if (err) { 
                console.log(err)
                rep.status(500).end("Erreur de création de l'employé")
            }
            rep.redirect("/offices.html")
        }
      );
    //connection.destroy()
})
app.get('/ofc/modifier/:id', function (req, rep) {
    var con = mysql.createConnection({
        host: "localhost", user: "root",
        password: "", database: "classicmodels"
    });
    con.connect(function (err) {
        if (err)
            throw err;
        let sql = `select * from offices where officeCode = ?`;
        con.query(sql, req.params.id, function (err, result) {
            if (err)
                throw err;
            console.log(JSON.stringify(result));
            rep.render('ofc/modifier', { donnees: result[0] });
        });
    });
});
app.post('/ofc/modifier/:id', function (req, rep) {
    const con = mysql.createConnection({
        host: "localhost", user: "root",
        password: "", database: "classicmodels"
    });
    con.connect(function (err) {
        if (err)
            throw err;
       
        let sql = `update offices set ? where officeCode = ?`;
        con.query(sql, 
            [req.body,req.params.id], 
            function (err, result) {
            if (err)
                throw err;
            console.log(JSON.stringify(result));
            });
    });
    rep.redirect("/offices.html")
});

app.get("/ofc/supprimer.html", function(req, rep){
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root',  database: 'classicmodels' });
    connection.query(
        'delete from offices where officeCode = ?', [req.query.num],
        function(err, results) { 
            if (err) { 
                rep.redirect("/offices.html?DEL=KO")
            }
            rep.redirect("/offices.html?DEL=OK")
        }
      );
})
//#endregion
app.listen(8080, function(){  console.log(`Serveur port 8080`)})