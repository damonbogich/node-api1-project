const express = require('express');
const shortId = require('shortid');

const server = express();

const users = [];

server.use(express.json());

server.get('/hello', (req, res) => {
    res.status(200).json({hello: "Web 27"})
});

//1. post endpoint
server.post('/api/users', (req, res) => {
    const userData = req.body;
    userData.id = shortId.generate();

    users.push(userData)
        if(!userData.name || !userData.bio) {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."});
        } else if(userData.name && userData.bio) {
            res.status(201).json(userData)
        } else {
            res.status(500).json({message: "error adding user to database"})
        }
});

//2. get users endpoint:

server.get('/api/users', (req, res) => {
    if(!users) {
        res.status(500).json({message: "server error getting users"})
    } else {
        res.status(200).json(users);
        console.log(users)
    }
});

//3. get user by id endpoint: 
//not returning correct user yet

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    console.log('type of user id, ', typeof(users[0].id));
    console.log('type of param id, ', typeof(req.params.id));
    const user = users.find(user => user.id === String(id))

    if(!user) {
        res.status(404).json({message: "user with given id does not exist"})
    } else if (!id) {
        res.status(500).json({message: "server error"})
    } else {
        res.status(200).json(user)
    }
  
})

//4. delete

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    
    const user = users.find(user => user.id === String(id));

    users.pop(user)
        if(!user) {
            res.status(404).json({message: "user with given id does not exist"})
        } else if (!id) {
            res.status(500).json({message: "server erro"})
        } else {
            res.status(200).json({delete: user})
        }
})






const PORT = 5000;
server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT} **\n`));