const express = require('express');
const app = express();
app.use(express.json());

const Student = [
    { id: 1, name: 'Ahmed'},
    { id: 2, name: 'Shanza'},
    { id: 3, name: 'Alia'},
    { id: 4, name: 'Aleena'},
    { id: 5, name: 'Mustafa'},
    { id: 6, name: 'Ayesha'},
]

//Student
app.get('/api/Student', (req, res) => {                    
    res.send(Student);
});

//post
app.post('/api/Student', (req, res) => {
    //Validation
    if (!req.body.name || req.body.name.length<6){
        res.status(400).send("Name is required and should be equal to or greater than 6");
        return;
    }
    const Stdl = {
        id: Student.length + 1,
        name: req.body.name
    }; 
    Student.push(Stdl);
    res.send(Stdl);
});

//get-with-id
app.get('/api/Student/:id', (req, res) => {
    const Stdl =  Student.find(c => c.id === parseInt(req.params.id));
    if (!Stdl) return res.status(404).send('The Student with given ID was not found');
    res.send(Stdl);
});

//PUT
app.put('/api/Student/:id', (req, res) => {
    const Stdl =  Student.find(c => c.id === parseInt(req.params.id));
    if (!Stdl) return res.status(404).send('The Student with given ID was not found');
    res.send(Stdl);

    if (!req.body.name || req.body.name.length<6){
        res.status(400).send("Name is required and should be equal to or greater than 6");
        return;
    }
    Stdl.name = req.body.name;
    res.send(Stdl);

});

//Delete-Std1
app.delete('/api/Student/:id', (req, res) => {
    const Stdl =  Student.find(c => c.id === parseInt(req.params.id));
    if (!Stdl) return res.status(404).send('The Student with given ID was not found');

    const index = Student.indexOf(Stdl);
    Student.splice(index,1);

    res.send(Stdl);
});


//app.get('/api/Student/:name/:cnic', (req, res) => {
   // res.send(req.params);
//});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));