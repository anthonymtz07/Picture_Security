const express = require('express');
const ruta = express.Router();
const User = require('../modelos/usuario');

/*-------------------------------------------- Ruta Admins - Users--------------------------------------------------------*/

/*Login -> Access for to users and admins */
ruta.get('/',(req,res)=>{
    res.render('login');
});

/*NewUser -> Create a new user*/
ruta.get('/newUser',(req,res)=>{
    res.render('newUser');
});

ruta.post('/new',(req,res)=>{
    const user = new User({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        camara1: req.body.camara1,
        camara2: req.body.camara2,
        tipo: req.body.tipo
    });
    user.save()
    .then(()=>{
        res.redirect('/principal')
    })
    .catch((err)=>{
        res.status(400).send('Error al enviar los documentos');
    });
});

/* Home -> Principal page on the app*/
ruta.get('/principal',(req,res)=>{
    res.render('principal');
});

ruta.post('/login',(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    
    User.find({
        "email":email, "password":password
    }).
    then((usu)=>{
        if(usu == ""){
            res.redirect('/logout')
        }
        else{
            if(usu[0].tipo == "usuario"){
                req.session.email = usu[0].email;
                res.redirect('/opcions');
            }
            else if(usu[0].tipo == "admin"){
                //this is wron
                req.session.email = usu[0].email;
                res.redirect('/admin');
            }
        }
    })
    .catch((err)=>{
        res.status(400).send('Error: '+err);
    })
});

/* Callcenter -> You can send a message or call to us */
ruta.get('/callcenter',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    res.render('callcenter');
});

/* History -> objectives, mission, vision about the app*/ 
ruta.get('/history',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    res.render('history');
});

/* Logout -> User or Admin off*/
ruta.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/principal')
});

/*-------------------------------------------- Ruta Admins --------------------------------------------------------*/

/* NewUser -> Create a new user with an admin*/ 
ruta.get('/newUserAdmin',(req,res)=>{
    res.render('newUserAdmin');
});
ruta.post('/newUserAdmin',(req,res)=>{
    const user = new User({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        camara1: req.body.camara1,
        camara2: req.body.camara2,
        tipo: req.body.tipo
    });
    user.save()
    .then(()=>{
        res.redirect('/usersON')
    })
    .catch((err)=>{
        res.status(400).send('Error al enviar los documentos');
    });
});

/* NewAdmin -> Create a new Admin*/
ruta.get('/newAdmin',(req,res)=>{
    res.render('newAdmin');
});

ruta.post('/newAdmin',(req,res)=>{
    const user = new User({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        camara1: req.body.camara1,
        camara2: req.body.camara2,
        tipo: req.body.tipo
    });
    user.save()
    .then(()=>{
        res.redirect('/adminsON')
    })
    .catch((err)=>{
        res.status(400).send('Error al enviar los documentos');
    });
});


/* InformationAdmin -> Check information about the admin*/
ruta.get('/informationAdmin',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    User.find({
        "email":req.session.email})
        .then((usu)=>{
            res.render('informationAdmin',{user:usu})
        })
        .catch((err)=>{
            res.status(400).send('Error al extrer la información de la base de datos, revisar la conexion: '+err)
        });
});

/* New Information User -> Check and Change information about the user with a admin*/
ruta.get('/newInformationUser/:id',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    var id = req.params.id;
    User.findById(id)
    .then((usu)=>{
        res.render('newInformationUser',{user:usu});
    })
    .catch((err)=>{
        res.status(400).send('Error al extraer la informacion de la base de datos, revisar la conexion: '+err)
    });
});

/* New Information Admin (Access 1) -> Change and Check information about the admin*/
ruta.get('/newInformationAdmin/:id',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    var id = req.params.id;
    User.findById(id)
    .then((usu)=>{
        res.render('newInformationAdmin',{user:usu});
    })
    .catch((err)=>{
        res.status(400).send('Error al extraer la informacion de la base de datos, revisar la conexion: '+err)
    });
});

/* New Information Admin (Access 2) -> Check and change information about the admin*/
ruta.get('/newInformationAdmin2/:id',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    var id = req.params.id;
    User.findById(id)
    .then((usu)=>{
        res.render('newInformationAdmin2',{user:usu});
    })
    .catch((err)=>{
        res.status(400).send('Error al extraer la informacion de la base de datos, revisar la conexion: '+err)
    });
});

ruta.post('/changeAdmin',(req,res)=>{
    var id = req.body.id;
    User.findByIdAndUpdate(id,{
        $set:{
            name:req.body.name,
            address:req.body.address,
            email:req.body.email,
            number:req.body.number,
            password:req.body.password,
            camara1:req.body.camara1,
            camara2:req.body.camara2, 
            tipo:req.body.tipo
        }
    },{new:true})
    .then(()=>{
        res.redirect('/adminsON');
    })
    .catch((err)=>{
        res.status(400).send('Error al modificar el usuario, revisar conexión: '+err);
    });
});

ruta.post('/changeUser',(req,res)=>{
    var id = req.body.id;
    User.findByIdAndUpdate(id,{
        $set:{
            name:req.body.name,
            address:req.body.address,
            email:req.body.email,
            number:req.body.number,
            password:req.body.password,
            camara1:req.body.camara1,
            camara2:req.body.camara2, 
        }
    },{new:true})
    .then(()=>{
        res.redirect('/logout');
    })
    .catch((err)=>{
        res.status(400).send('Error al modificar el usuario, revisar conexión: '+err);
    });
});

/* Delete -> Delete information about an user with an Admin*/
ruta.get('/delete/:id',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    var id = req.params.id;
    User.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/usersON');
    })
    .catch((err)=>{
        res.status(400).send("Error al eliminar al usuario "+err);
    })
});

/* Delete Admin -> Delete information about an Admin*/
ruta.get('/deleteAdmin/:id',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    var id = req.params.id;
    User.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/adminsON');
    })
    .catch((err)=>{
        res.status(400).send("Error al eliminar al usuario "+err);
    })
});

/* Admin -> Export information of admins*/
ruta.get('/admin',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    User.find({
        "email":req.session.email})
        .then((usu)=>{
            res.render('opcions_admin',{user:usu})
        })
        .catch((err)=>{
            res.status(400).send('Error al extrer la información de la base de datos, revisar la conexion a internet')
        });
});

/* UserON -> Table about users*/
ruta.get('/usersON',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    User.find({
        "tipo":"usuario"})
        .then((usu)=>{
            res.render('tableUsers',{user:usu})
        })
        .catch((err)=>{
            res.status(400).send('Error al extrer la información de la base de datos, revisar la conexion: '+err)
        });
});

/*AdminsOn -> Table about Admins*/
ruta.get('/adminsON',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    User.find({
        "tipo":"admin"})
        .then((usu)=>{
            res.render('tableAdmin',{user:usu})
        })
        .catch((err)=>{
            res.status(400).send('Error al extrer la información de la base de datos, revisar la conexion: '+err)
        });
});

ruta.post('/buscarUser',(req,res)=>{
    User.find({"email":req.body.buscar})
    .then((usu)=>{
        if(usu[0].tipo == "usuario"){
            res.render('tableUsers',{user:usu});
        }
        else if(usu[0].tipo == "admin"){
            res.send("Este usuario es administrador, revisar correo....")
        }
    })
    .catch((err)=>{
        res.status(400).send("Status 404... Error al encontrar el usuario")
    })
});

ruta.post('/buscarAdmin',(req,res)=>{
    User.find({"email":req.body.buscar})
    .then((usu)=>{
        if(usu[0].tipo == "admin"){
            res.render('tableAdmin',{user:usu});
        }
        else if(usu[0].tipo == "usuario"){
            res.send("Este es un usuario, revisar correo....")
        }
    })
    .catch((err)=>{
        res.status(400).send("Status 404... Error al encontrar el administrador")
    })
});

/*-------------------------------------------- Ruta User --------------------------------------------------------*/

/* Opcion -> Export information of user*/
ruta.get('/opcions',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    User.find({
        "email":req.session.email})
        .then((usu)=>{
            res.render('opcions',{user:usu})
        })
        .catch((err)=>{
            res.status(400).send('Error al extrer la información de la base de datos, revisar la conexion a internet')
        });
});

/*Information -> check information about the user*/
ruta.get('/information',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    User.find({
        "email":req.session.email})
        .then((usu)=>{
            res.render('information',{user:usu})
        })
        .catch((err)=>{
            res.status(400).send('Error al extrer la información de la base de datos, revisar la conexion: '+err)
        });
});

/*New Information -> Check and Change information about the user*/
ruta.get('/newInformation/:id',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    var id = req.params.id;
    User.findById(id)
    .then((usu)=>{
        res.render('newInformation',{user:usu});
    })
    .catch((err)=>{
        res.status(400).send('Error al extraer la informacion de la base de datos, revisar la conexion: '+err)
    });
});

ruta.post('/change',(req,res)=>{
    var id = req.body.id;
    User.findByIdAndUpdate(id,{
        $set:{
            name:req.body.name,
            address:req.body.address,
            email:req.body.email,
            number:req.body.number,
            password:req.body.password,
            camara1:req.body.camara1,
            camara2:req.body.camara2, 
            tipo:req.body.tipo
        }
    },{new:true})
    .then(()=>{
        res.redirect('/usersON');
    })
    .catch((err)=>{
        res.status(400).send('Error al modificar el usuario, revisar conexión: '+err);
    });
});


/* Delete User -> Delete information about an user*/ 
ruta.get('/deleteUser/:id',(req,res)=>{
    if(!req.session.email){
        res.redirect('/principal');
    }
    var id = req.params.id;
    User.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/principal');
    })
    .catch((err)=>{
        res.status(400).send("Error al eliminar al usuario "+err);
    })
});

module.exports=ruta;
