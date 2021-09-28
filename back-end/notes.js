const fs = require('fs')
const chalk = require('chalk')
let connection = require('./db.js');


const addNote = (title, body, tags) => {
    let sql = "INSERT INTO notes(title,body,tags) VALUES('" + title + "' , '" + body + "' , '" + tags + "')";
    connection.query(sql);

    console.log(chalk.green.inverse('New note added!'))
    connection.end();
    // const notes = loadNotes()
    // const duplicateNote = notes.find((note) => note.title === title)

    // if (!duplicateNote) {
    //     notes.push({
    //         title: title,
    //         body: body,
    //         tags: tags.split(","),
    //     })
    //     saveNotes(notes)
    //     console.log(chalk.green.inverse('New note added!'))
    // } else {
    //     console.log(chalk.red.inverse('Note title taken!'))
    // }
}

const saveNotes = (notes) => {
    //const dataJSON = JSON.stringify(notes)
    //fs.writeFileSync('notes.json', dataJSON)
    console.log(notes)
}

const readNote = (title) => {
    // const notes = loadNotes()
    // const note = notes.find((note) => note.title === title)
    

    // if (note) {
    //     console.log(chalk.inverse(note.title))
    //     console.log(note.body)
    //     console.log(note.tags)
    // } else {
    //     console.log(chalk.red.inverse('Note not found!'))
    // }
    let sql = "SELECT * from notes WHERE title = ?";
    connection.query(sql, title,function (err, note, fields) {
        if (err) throw err;
        if(note.length === 0){
            console.log("no notes found")
        }else{
            console.log(chalk.green.inverse('note read!'))
            console.log("title", "body", "tags")
            console.log(note[0].title, note[0].body, note[0].tags)
        }
      });

    connection.end();
}

const removeNote = (title) => {
    // const notes = loadNotes()
    // const notesToKeep = notes.filter((note) => note.title !== title)

    // if (notes.length > notesToKeep.length) {
    //     console.log(chalk.green.inverse('Note removed!'))
    //     saveNotes(notesToKeep)
    // } else {
    //     console.log(chalk.red.inverse('No note found!'))
    // }    
    let sql = "DELETE FROM notes WHERE title = ?";
    connection.query(sql, title,function (err, results, fields) {
        if (err) throw err;
        console.log(results.affectedRows, 'note removed!');
      });

    connection.end();
}

const listNotes = async() => {
    // const notes = loadNotes()

    // console.log(chalk.inverse('Your notes'))

    // notes.forEach((note) => {
    //     console.log(note.title)
    // })
    // let sql = "SELECT * from notes";
    // connection.query(sql, function (err, notes, fields) {
    //     if (err) throw err;
    //     notes.forEach((note) => {
    //         console.log(chalk.inverse('Your notes'))
    //         console.log(note.title, note.body, note.tags)})
    //   });
    const [rows, fields] = await connection.query('SELECT * from notes');
    console.log(rows)
    await connection.end();
}

const addTag = async (title, tags) => {
    let uptags
    let sql = " SELECT * from notes WHERE title = ?";
    connection.query(sql, title, (err, note, fields) => {
        if (err) throw err;
        if(note.length === 0){
            console.log("no notes found")
        }else{
            if(note[0].tags === null){
                uptags = tags              
            }
            else{ 
                uptags = note[0].tags + ',' + tags
            }
        }console.log(uptags) //undefined
    sql = " UPDATE notes SET tags = ? WHERE title = ?";
    connection.query(sql, [uptags, title],function (err, results, fields) {
        if (err) throw err;
        console.log(results)
      });
      });
    connection.end();
}
const remTag = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {

        if(note.tags !== undefined){
            note.tags = undefined
            saveNotes(notes)
            console.log(chalk.green.inverse('Note Tag removed'))
        }
        else{
            console.log(chalk.green.inverse('Note has no tag!'))
        }
    }
    else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const updTag = (title, tags) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (note) {
        if(note.tags !== undefined){
            const nt = note.tags + ',' + tags
            notesToKeep.push({
                title: title,
                body: note.body,
                tags: nt.split(",")
            })
            saveNotes(notesToKeep)
            console.log(chalk.green.inverse('Note Tag updated'))
        }
        else{
            console.log(chalk.red.inverse('Note has no tag!'))
        }
    }
    else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

// const loadNotes = () => {
//     try {
//         const dataBuffer = fs.readFileSync('notes.json')
//         const dataJSON = dataBuffer.toString()
//         return JSON.parse(dataJSON)
//     } catch (e) {
//         return []
//     }
// }

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    addTag: addTag,
    remTag: remTag,
    updTag: updTag
}