module.exports = function(app,knex){


//#region API DES EMPLOYES

app.get("/api/employes2", function(req, rep){
    knex.from('employees').select('*')//.select('*')
        .then((liste)=>{rep.json(liste)})
        .catch((err) => {
            console.log(err)
            rep.status(500).end("Erreur de chargement des employés")
        })

})

app.get("/api/employes2/:id", function(req, rep){
        knex.from('employees').select('*')
        .where('employeeNumber',[req.params.id])
        .then((liste)=>{
            if (results.length == 0) { rep.status(404).end();return;}
            rep.json(liste[0])
            })
        .catch((err) => {
            console.log(err)
            rep.status(500).end("Erreur de chargement des employés")
        })
})

app.post("/api/employes2", function(req, rep){
    knex.from('employees').insert(req.body)
        .then(() => rep.status(201).json({message:"OK"}))
         .catch((err) => {
            console.log(err)
            rep.status(500).end("Erreur de création de l'employé")
        })
})

app.put("/api/employes2/:id", function(req, rep){
     knex.from('employees')
        .where('employeeNumber',[req.params.id])
        .update(req.body)
        .then(() => rep.status(201).json({message:"OK"}))
         .catch((err) => {
            console.log(err)
            rep.status(500).end("Erreur de création de l'employé")
        })
        
})


app.delete("/api/employes2/:id", function(req, rep){
    .where('employeeNumber',[req.params.id])
        .delete(req.body)
        .then(() => rep.status(204).end())
         .catch((err) => {
            console.log(err)
            rep.status(500).end("Erreur de création de l'employé")
        })
})

//#endregion 


}