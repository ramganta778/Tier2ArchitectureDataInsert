let mongoose = require("mongoose");
const { type } = require("os");

let moviesSchema = new mongoose.Schema({
  movieName: String,
  heroName: String,
  heroineName: String,
  directorName: String,
  villainName: String,
  noOfCharacters: Number,
});

let playerSchema = new mongoose.Schema({
  playerName: String,
  age: {
    type: Number,
    min: [1, "Invalid value"],
    max: [70, "invalid value"],
  },
  teamName: {
    type: String,
    enum: ["csk", "rcb", "kkr", "kxip", "rr", "srh", "lsg", "gt", "dd", "mi"],lowercase:true,
  },

  email: {
    type: String,
    validate: {
      validator: function(v) {
        return  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  nationality: String,
});

let movie = new mongoose.model("movie", moviesSchema);

let player = new mongoose.model("player", playerSchema);

let saveData = async () => {
  let OG = new movie({
    movieName: "Original Gangstar",
    heroName: "Pawan Kalyan",
    heroineName: "Priyanka Mohan",
    directorName: "Sujeeth Sambavam",
    villainName: "Emraan Hashmi",
    noOfCharacters: 15,
  });

  await OG.save();
  console.log("Successfully Movie Data is Stored");
};

let dhoniData = async () => {
  let csk = new player({
    playerName: "M S Dhoni",
    age: 45,
    teamName: "CSK",
    email: "dhoni@gmail.com",
    nationality: "India",
  });

  await csk.save();
  console.log("Successfully Player Data is Stored")
};

let abhiData = async () => {
    let srh = new player({
      playerName: "Abishek Sharma",
      age: 22,
      teamName: "srh",
      email: "abishek@gmail.com",
      nationality: "India",
    });
  
    await srh.save();
    console.log("Successfully Player Data is Stored")
  };

let connectToPlayerDB = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://ramganta778:balaji@cluster0.vhgpcgw.mongodb.net/cricket,movie?retryWrites=true&w=majority&appName=Cluster0"
      );
  
      console.log("Successfully Connected to the DB");
      abhiData();
      dhoniData();
      saveData();
    } catch (err) {
      console.log("Unable to connect");
    }
  };
  connectToPlayerDB(); 


