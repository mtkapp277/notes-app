const chalk = require('chalk')
const yargs = require('yargs')
const noteUtilities = require('./notes.js')

// Customized yargs version
yargs.version('1.1.0')


// Create add command
yargs.command({
    command: 'add',
    descibe: 'Command to Add a new note',
    builder: {
        title: {
            descibe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            descibe: 'Note contents',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //console.log('Title: ', argv.title)
        //console.log('Body: ', argv.body)
        noteUtilities.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    descibe: 'Commmand to Remove a note',
    builder: {
        title: {
            descibe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { noteUtilities.removeNote(argv.title) }
})

// Create List command
yargs.command({
    command: 'list',
    descibe: 'list notes',
    handler() { 
        console.log('....listing notes') 
        noteUtilities.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    descibe: 'read a note',
    builder: {
        title: {
            descibe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //console.log('reading a note')
        noteUtilities.readNote(argv.title)
    }
})

yargs.parse()
//console.log(process.argv)

//console.log(yargs.argv)