const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
        tags: {
            describe: 'Note tag',
            demandOption: false,
            type: 'string'
        }
    },
    
    handler(argv) {
        notes.addNote(argv.title, argv.body, argv.tags)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// Create addTag command
yargs.command({
    command: 'at',
    describe: 'add a new tag to existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        tags: {
            describe: 'Note tag',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addTag(argv.title, argv.tags)
    }
})

// Create removeTag command
yargs.command({
    command: 'rt',
    describe: 'remove tag in a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.remTag(argv.title)
    }
})

// Create updateTag command
yargs.command({
    command: 'ut',
    describe: 'add a new tag to existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        tags: {
            describe: 'Note tag',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.updTag(argv.title, argv.tags)
    }
})

yargs.parse()