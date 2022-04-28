const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://majabaza:${password}@cluster0.k9dqp.mongodb.net/note-app?retryWrites=true&w=majority`;

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "The last note",
  date: new Date(),
  important: true,
});

//note.save().then(result => {
//    console.log('note saved!')
//    mongoose.connection.close()
//})

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
