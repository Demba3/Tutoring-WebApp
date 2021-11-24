const firebase = require("firebase");
const functions = require("firebase-functions");
const { admin, db } = require("./util/admin");
const app = require("express")();
const { firebaseConfig } = require("./util/config");
firebase.initializeApp(firebaseConfig);
const { validateSignupData, validateLoginData } = require("./util/validator");
const { FBAuth } = require("./util/FBAuth");
const { UserRecordMetadata } = require("firebase-functions/v1/auth");
const cors = require('cors');
// Create and Deploy Your First Cloud Functions
//firebase.google.com/docs/functions/write-firebase-functions
https: app.get("/helloWorld", (request, response) => {
  response.send("Hello from Firebase!");
});

app.use(cors({
  origin: ["*"],
  methods: ["POST, GET"],
  credentials: true
}));

app.post("/signup", (req, res) => {
  const newUser = {
    // createdAt: new Date().toDateString(),
    email: req.body.email,
    userHandle: req.body.handle,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    type: req.body.type,
  };
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  let token;
  let userId;
  const blankImg = "no-img.png";
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "This handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      console.log(userId);
      return data.user.getIdToken();
    })
    .then((tokenid) => {
      token = tokenid;
      console.log(token);
      const userCredentials = {
        createdAt: new Date().toDateString(),
        email: newUser.email,
        handle: newUser.userHandle,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${blankImg}?alt=media`,
        type: newUser.type,
        userId,
      };
      console.log(userCredentials);
      return db
        .collection("users")
        .doc(`${userCredentials.handle}`)
        .set(userCredentials);
    })
    .then((data) => {
      console.log(data);
      return res.status(201).json({ token });
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "This email is already taken" });
      }
      return res
        .status(500)
        .json({ error: "Somethig went wrong please try again" });
    });
});

app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        res.status(400).json({ general: "wrong credentials please try again" });
      }
      res.status(500).json({ error: err.code });
    });
});

// app.get("appointment/:handle", FBAuth, (req, res) => {

// });
// app.post("appointment/:appointmentId", (req, res) => {

// })

//get all appointments for tutor to approve
app.get("/appointments", FBAuth, (req, res) => {
  if (req.user.type !== "Tutor") {
    res.status(400).json({ error: "unauthorised access" });
  }
  db.collection("appointments")
    .get()
    .then((data) => {
      let appointments = [];
      data.forEach((doc) => {
        appointments.push(doc.data());
      });
      return res.json(appointments);
    })
    .catch((err) => {
      console.log(err);
    });
});
//Approve appointment
app.post("/appointment/:appointmentId", FBAuth, (req, res) => {
  if (req.user.type !== "Tutor") {
    res.status(400).json({ error: "unauthorised access" });
  }
  db.doc(`appointments/${req.params.appointmentId}`)
    .update({ approved: true })
    .then(() => {
      res.json({ message: `Appointment${doc.id} successfully approved` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.code });
    });
});

//get the users appoinments
app.get("/user/appointments", FBAuth, (req, res) => {
  db.collection("appointments")
    .where("userHandle", "==", req.user.handle)
    .get()
    .then((data) => {
      let appointments = [];
      data.forEach((doc) => {
        appointments.push(doc.data());
      });
      return res.json(appointments);
    })
    .catch((err) => {
      console.log(err);
    });
});
//student create appointments
app.post("/appointment", FBAuth, (req, res) => {
  const newAppointment = {
    createdAt: new Date().toDateString(),
    location: req.body.location,
    subject: req.body.subject,
    approved: false,
    userHandle: req.user.handle,
    imageUrl: req.user.imageUrl,
    time: req.body.time,
  };
  console.log(newAppointment);
  db.collection("appointments")
    .add(newAppointment)
    .then((doc) => {
      db.doc(`appointments/${doc.id}`)
        .update({ appointmentId: doc.id })
        .then(() => {
          res.json({ message: `document${doc.id} created successfully` });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "something went wrong" });
    });
});
//post picture
app.post("/user/image", FBAuth, (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log("type", mimetype);
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return res.status(400).json({ error: "wrong file type" });
    }
    const imageExtendion = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    )}.${imageExtendion}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.code });
      });
  });
  busboy.end(req.rawBody);
});
//add user details
app.post("/user", FBAuth, (req, res) => {
  let userdetails;
  if (req.user.type === "Tutor") {
    userdetails = {
      subjects: req.body.subjects,
      major: req.body.major,
      classStanding: req.body.classStanding,
    };
  } else {
    userdetails = {
      major: req.body.major,
      classStanding: req.body.classStanding,
      bio: req.body.bio,
    };
  }
  db.doc(`/users/${req.user.handle}`)
    .update(userdetails)
    .then(() => {
      res.json({ message: "details added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.code });
    });
});

// get authenticated user data

app.get("/user", FBAuth, (req, res) => {
  let user;
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        user = doc.data();
        return res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(400).json({ err: err.code });
    });
});
exports.api = functions.https.onRequest(app);
