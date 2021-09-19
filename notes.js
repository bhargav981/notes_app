const fs = require('fs')
const chalk = require('chalk')
const { convertCSVToArray } = require('convert-csv-to-array')
const converter = require('convert-csv-to-array')

const addNote = (title, body, tags) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
            tags: tags.split(","),
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
        console.log(note.tags)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const addTag = (title, tags) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (note) {

        if(note.tags === undefined){
            notesToKeep.push({
                title: title,
                body: note.body,
                tags: tags
            })
            saveNotes(notesToKeep)
            console.log(chalk.green.inverse('New Note Tag added'))
        }
        else{
            console.log(chalk.green.inverse('Note already has a tag!'))
        }
    }
    else {
        console.log(chalk.red.inverse('Note not found'))
    }
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
        const nt = note.tags
        if(note.tags !== undefined){
            notesToKeep.push({
                title: title,
                body: note.body,
                tags: nt.concat(tags)
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

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    addTag: addTag,
    remTag: remTag,
    updTag: updTag
}