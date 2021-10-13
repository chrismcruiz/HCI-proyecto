const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const users = require("../models/SingUp");
const UserSession = require("../models/SignIn");
const matches = require("../models/Match");
const conversations = require("../models/Conversation");
const messages = require("../models/Messages");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.post("/signup", upload.single("photo"), async (req, res) => {
  const { body, file } = req;
  const { name, email, birthday, career, password } = body;

  let photo = file

  if (!name) {
    return res.send({
      success: false,
      message: "El nombre no puede ir en blanco.",
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "El correo electrónico no puede ir en blanco.",
    });
  }
  if (!birthday) {
    return res.send({
      success: false,
      message: "La fecha de nacimiento no puede ir en blanco.",
    });
  }
  // if (!gender) {
  //   return res.send({
  //     success: false,
  //     message: "El género no puede ir en blanco.",
  //   });
  // }
  if (!career) {
    return res.send({
      success: false,
      message: "La carrera no puede ir en blanco.",
    });
  }
  // if (!photo) {
  //   return res.send({
  //     success: false,
  //     message: "Error: La foto no puede ir en blanco.",
  //   });
  // }
  if (!password) {
    return res.send({
      success: false,
      message: "La contraseña no puede ir en blanco.",
    });
  }

  users.find(
    {
      email: email.toLowerCase(),
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "¡Ya existe una cuenta registrada con ese correo!",
        });
      }

      const newUser = new users();

      newUser.email = email;
      newUser.name = name;
      // newUser.gender = gender;
      newUser.career = career;
      newUser.birthday = birthday;
      // newUser.photo = photo ? photo.filename : gender === 'masculino' ? 'male_icon.png' : gender === 'femenino' ? 'female_icon.png' : 'user_icon.png';
      newUser.photo = 'user_icon.png';
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error",
          });
        }
        return res.send({
          success: true,
          message: "Registro válido",
        });
      });
    }
  );
});

router.post("/signin", (req, res, next) => {
  const { body } = req;
  const { password } = body;

  let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "El correo electrónico no puede ir en blanco.",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "La contraseña no puede ir en blanco.",
    });
  }

  email = email.trim().toLowerCase();

  users.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "El correo electrónico ingresado no coincide con nuestros registros. Por favor, revisa e inténtalo de nuevo.",
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "La contraseña ingresada no coincide con nuestros registros. Por favor, revisa e inténtalo de nuevo.",
        });
      }

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error",
          });
        }
        return res.send({
          success: true,
          message: "Logueo válido",
          token: doc._id,
          id_user: user._id,
          matches: user.matches,
        });
      });
    }
  );
});

router.get("/verify", (req, res, next) => {
  //get the token
  const { query } = req;
  const { token } = query;
  // verify the token of one of a kind and its not deleted

  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }

      if (sessions.length != 1) {
        return res.send({
          sucess: false,
          message: "Error: Invalido",
        });
      } else {
        return res.send({
          success: true,
          idUsuario: sessions[0].userId,
          message: "Correctito!",
        });
      }
    }
  );
});

router.get("/logout", (req, res, next) => {
  //get the token
  const { query } = req;
  const { token } = query;
  // verify the token of one of a kind and its not deleted

  users.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correcto",
      });
    }
  );
});

router.get("/users", (req, res) => {
  // downloading data from our database
  users.find((err, data) => {
    if (err) {
      res.status(500).send(err); // 500 means 'internal server error'
    } else {
      res.status(200).send(data); // 200 means 'success'
    }
  });
});

router.get('/users/sesion', (req, res) => { // downloading data from our database
  const sessions = req.body;
  UserSession.find((err, data) => {
    if (err) {
      res.status(500).send(err) // 500 means 'internal server error'
    } else {
      res.status(200).send(data) // 200 means 'success'
    }
  })
})

router.post("/liked", (req, res, next) => {
  const { body } = req;
  const { idUser, idPersonLiked } = body;

  users.updateOne(
    {
      _id: idUser,
    },
    {
      $addToSet: {
        liked: idPersonLiked,
      },
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correcto",
      });
    }
  );
});



// users.findOneAndUpdate(
//   {
//     _id: idUser,
//   },
//   {
//     $pull: {
//       liked: idMatch,
//       matches: idMatch
//     },
//   },
//   {new: true},
//   (err, usuario) => {
//     if (err) {
//       return res.send({
//         sucess: false,
//         message: "Error: Server error",
//       });
//     }
//     return res.send({
//       success: true,
//       message: "Correcto",
//       tarjetas: usuario.matches
//     });
//   }
// );


router.post("/setmatch", (req, res, next) => {
  const { body } = req;
  const peopleToUpdate = body;

  users.bulkWrite(
    peopleToUpdate.map((person) =>
    ({
      updateOne: {
        filter:
        {
          _id: person._id
        },
        update: {
          $addToSet:
          {
            matches: person.liked,
          },
        }
      }
    })
    )
  )
});


// router.post("/setmatch", (req, res, next) => {
//   const { body } = req;
//   const peopleToUpdate = body;

//   users.updateMany(
//     {
//       _id: idUser,
//     },
//     {
//       $addToSet: {
//         matches: idPersonLiked,
//       },
//     },
//     null,
//     (err, sessions) => {
//       if (err) {
//         return res.send({
//           sucess: false,
//           message: "Error: Server error",
//         });
//       }
//       return res.send({
//         success: true,
//         message: "Correcto",
//       });
//     }
//   );
// });

router.delete("/deleteusers", (req, res, next) => {
  users.deleteMany({}, null, (err, sessions) => {
    if (err) {
      return res.send({
        sucess: false,
        message: "Error: Server error",
      });
    }
    return res.send({
      success: true,
      message: "Correcto",
    });
  });
});

router.delete("/deletesessions", (req, res, next) => {
  UserSession.deleteMany({}, null, (err, sessions) => {
    if (err) {
      return res.send({
        sucess: false,
        message: "Error: Server error",
      });
    }
    return res.send({
      success: true,
      message: "Correcto",
    });
  });
});


router.get("/matches", (req, res) => {
  // downloading data from our database

  const { query } = req;
  const { _id } = query;

  users.find(
    {
      _id: _id,
    },
    (err, user) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }

      if (user.length != 1) {
        return res.send({
          sucess: false,
          message: "Error: Invalido",
        });
      } else {
        return res.send({
          success: true,
          matches: user[0].matches,
          message: "Correctito!",
        });
      }
    }
  );
});

router.post("/getInfo", (req, res) => {
  // downloading data from our database

  const { body } = req;
  const { _id } = body;

  users.find(
    {
      _id: {
        $in: _id
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err); // 500 means 'internal server error'
      } else {
        res.status(200).send(data);
      }
    }
  );
});

router.post("/getInfoMatches", (req, res) => {
  // downloading data from our database

  const { body } = req;
  const { ids } = body;

  users.find(
    {
      _id: {
        $in: ids
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err); // 500 means 'internal server error'
      } else {
        res.status(200).send(data);
      }
    }
  );
});

router.put("/update", upload.single("photo"), async (req, res) => {
  // downloading data from our database

  const { body, file } = req;
  const { _id, name, birthday, description, career, photo } = body;

  let photoxd = "";

  if (file === undefined) {
    photoxd = photo;
  } else {
    photoxd = file.filename;
  }

  users.updateOne(
    {
      _id: _id,
    },
    {
      $set: {
        name: name,
        birthday: birthday,
        description: description,
        career: career,
        photo: photoxd,
      },
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correcto",
      });
    }
  );
});


router.post("/deleteMatch", (req, res, next) => {
  const { body } = req;
  const [idMatch, idUser] = body;


  users.findOneAndUpdate(
    {
      _id: idUser,
    },
    {
      $pull: {
        liked: idMatch,
        matches: idMatch
      },
    },
    { new: true },
    (err, usuario) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correcto",
        tarjetas: usuario.matches
      });
    }
  );
});

// router.delete("/admin/deleteuser", (req, res, next) => {
//   const { body } = req;
//   const { _id } = body;
//   users.findOneAndDelete(
//     {
//       _id: _id,
//     },
//     {new: true},
//     (err, user) => {
//       if (err) {
//         return res.send({
//           sucess: false,
//           message: "Error: Server error",
//           tarjetas: user.matches
//         });
//       }
//       return res.send({
//         success: true,
//         message: "Correcto",
//       });
//     }
//   );
// });

router.post("/addFilter", (req, res, next) => {
  const { body } = req;
  const { idUsuario, filtro } = body;

  users.findOneAndUpdate(
    {
      _id: idUsuario,
    },
    {
      $addToSet: {
        filters: filtro,
      },
    },
    { new: true },
    (err, usuario) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correcto",
        filtros: usuario.filters,
      });
    }
  );
});

router.post("/deleteFilter", (req, res, next) => {
  const { body } = req;
  const [name, idUser] = body;


  users.findOneAndUpdate(
    {
      _id: idUser,
    },
    {
      $pull: {
        filters: name,
      },
    },
    { new: true },
    (err, usuario) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correcto",
        filtros: usuario.filters,
      });
    }
  );
});

router.post("/getInfoTarjetas", (req, res, next) => {
  const { body } = req;
  const { idUser } = body;


  users.find(
    {
      _id: idUser,
    },
    (err, user) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correctito!",
        tarjetas: user[0],
      });

    }
  );
});


// Chats

router.post("/createConversation", (req, res) => {
  const { body } = req;
  const [idA, idB] = body;

  conversations.findOne(
    {
      participants: {
        $all: [idA, idB]
      }
    },
    (err, conversation) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        })
      } else if (conversation) {
        return res.send({
          success: false,
          conversationId: conversation._id,
          message: "Ya existe está conversación",
        })
      }

      const newConversation = new conversations();
      newConversation.participants.push(idA, idB);
      newConversation.save((err, conversation) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          message: "Conversación creada",
          conversationId: conversation._id
        });
      })
    }
  )
})

router.get("/conversations/verify", (req, res) => {
  //get the token
  const { query } = req;
  const { idA, idB } = query;
  // verify the token of one of a kind and its not deleted

  conversations.find(
    {
      participants: {
        $all: [idA, idB]
      }
    },
    (err, conversation) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      if (conversation.length != 1) {
        return res.send({
          sucess: false,
          message: "Error: Invalido",
        });
      } else {
        return res.send({
          success: true,
          message: "Correctito!",
          idRoom: conversation[0]._id,
        });
      }
    }
  );
});


router.get("/getConversations", (req, res) => {
  //get the token
  const { query } = req;
  const { _id } = query;
  // verify the token of one of a kind and its not deleted

  conversations.find(
    {
      participants: {
        $in: [_id]
      }
    },
    (err, conversations) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correctito!",
        conversations: conversations
      });
    }
  );
});

router.get("/getParticipants", (req, res) => {
  //get the token
  const { query } = req;
  const { room } = query;
  // verify the token of one of a kind and its not deleted

  conversations.find(
    {
      _id: room
    },
    (err, participants) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correctito!",
        participants: participants
      });
    }
  );
});


// Guardar mensajes

router.post("/storeMessages", (req, res) => {
  const { body } = req;
  const { sender, message, room, timestamp } = body;

  const newMessage = new messages();
  newMessage.sender = sender
  newMessage.message = message
  newMessage.room = room
  newMessage.timestamp = timestamp
  newMessage.save((err, message) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error"
      });
    }
    return res.send({
      success: true,
      message: "Mensaje guardado"
    });
  })
})


router.get("/getMessages", (req, res) => {
  //get the token
  const { query } = req;
  const { _id } = query;
  // verify the token of one of a kind and its not deleted

  if (_id !== '') {
    messages.find(
      {
        room: _id
      },
      (err, messages) => {
        if (err) {
          return res.send({
            sucess: false,
            message: "Error: Server error",
          });
        }
        return res.send({
          success: true,
          message: "Correctito!",
          messages: messages,
        });
  
      }
    );
  } else {
    messages.find(
      (err, messages) => {
        if (err) {
          return res.send({
            sucess: false,
            message: "Error: Server error",
          });
        }
        return res.send({
          success: true,
          message: "Correctito!",
          messages: messages,
        });
      }
    );
  }
  
});

router.get("/getLastMessage", (req, res) => {
  //get the token
  const { query } = req;
  const { name } = query;
  // verify the token of one of a kind and its not deleted

  messages.find(
    {
      sender: name
    },
    (err, mensaje) => {
      if (err) {
        return res.send({
          sucess: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Correctito!",
        mensajes: mensaje,
      });

    }
  );
});


router.get("/getLastMessages", (req, res) => {
  //get the token
  const { body } = req;

  // verify the token of one of a kind and its not deleted
  messages.aggregate([
    {
      $group: { 
        _id: "$room",
        timestamp: { $last: "$timestamp"},
        ultimo: { $last: "$message"},
      }
    }
  ]).exec((err, post) => {
    // console.log(post)
    if (err) {
      return res.send({
        sucess: false,
        message: "Error: Server error",
      });
    }
    return res.send({
      success: true,
      message: "Correctito!",
      mensajes: post
    });

  });
});


module.exports = router;
