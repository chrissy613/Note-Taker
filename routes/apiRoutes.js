const fs = require("fs");
let data = JSON.parse(fs.readFileSync("./db/db.json"));

module.exports = function(app) {
    //see notes
    app.get("/api/notes", function(req, res) {
       res.json(data);
    });
    //creates note
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 
        res.json(data);    
    });
    //deletes note
    app.delete("/api/notes/:id", function(req, res) {
        let noteId = req.params.id;
        let newId = 0;
        data = data.filter(note => {
           return note.id != noteId;
        });
        for (note of data) {
            note.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 
}

