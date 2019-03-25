
const db = require("../db/dbConfig");


// exports
module.exports = server => {
    server.get("/notes/:id", viewNote);
    server.post("/addNote", addNote);
    server.get("/notes", getNotes);
    server.get("/notess", filterNotes);
    server.put("/updateNote/:id", updateNote)
    server.delete("/deleteNote/:id",deleteNote)
};

function addNote(req, res) {
    const notes = req.body;
    db("notes")
        .insert(notes)
        .then(ids => res.status(200).json(ids[0]))
        .catch(err =>
            res.status(500).json({ error: "Could not add note properly" })
        );
}

function filterNotes(req, res) {
    const { title } = req.body;
    db("notes")
        .where({ title })
        .then(notes => res.status(200).json({ notes }))
        .catch(err => res.status(500).json(err));
}

function viewNote(req, res) {
    const { id } = req.params;
    db("notes")
        .where({ id })
        .then(notes => res.status(200).json({ notes }))
        .catch(err => res.status(500).json(err));
}

function getNotes(req, res) {
    db("notes")
        .then(notes => res.status(200).json({ notes }))
        .catch(error => res.status(500).json(error));
}


function updateNote(req, res) {
    const { id } = req.params;
    const changes = req.body;
    db("notes")
        .where({ id })
        .update(changes)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: 'No note found to update' });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => res.status(500).json(err));
};


function deleteNote (req, res ) {
    const { id } = req.params;
      
        db("notes")
        .where({ id })
        .del()
          .then(count => {
            if (!count || count < 1) {
              res.status(404).json({ message: 'No note found to delete' });
            } else {
              res.status(200).json(count);
            }
          })
          .catch(err => res.status(500).json(err));
}



