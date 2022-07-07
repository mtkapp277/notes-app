//console.log('in notes.js')
const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your Notes'
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find( (note) => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Title not found'))
    }
    
}

const addNote = (title, body) => {
    // load in existing notes (don't override data) (stored as JSON)
    //parse JSON
    const notes = loadNotes()

    //Check if title exists
    //const duplicateNotes = notes.filter( (note) => note.title === title )
    const duplicateNote = notes.find((note) => note.title === title)

    //debugger

    //if (duplicateNotes.length === 0) {
    if (!duplicateNote) {  //if there is no match
        //Add something new onto the array
        notes.push({
            title: title,
            body: body
        })

        // Save back to the file system
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJsON)
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

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.yellow.inverse('Your notes...'))
    notes.forEach( (note) => {
        console.log(note.title)
    })   
}

const removeNote = (title) => {
    const notes = loadNotes()

    //Check if title exists
    const remainingNotes = notes.filter( (note) => note.title !== title )

    if (notes.length > remainingNotes.length) {
        console.log(chalk.green.inverse('Note Removed'))
        saveNotes(remainingNotes)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

//module.exports = getNotes
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
