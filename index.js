const express = require('express');
const path = require('path');
const port = 1000;
const app = express();
var record = [ ];
app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('form', {
        img: '/abstractColor.jpg',
        img2 : '/artwork.png',
        img3: '/doodle.png',
        img4: '/dynamicToDo_Bootstrap_jquery.png',
        record
    });
});

app.post('/indata',(req,res)=>{
    let editid = req.body.eid;
    const {id,name,task} = req.body

    if(editid){
        let update = record.filter((val)=>{
            if(val.id == editid){
                val.name = name;
                val.task = task;
            }
            return val;
        });
        record = update;
        res.redirect('/');
    }else{
        
        let obj = {
            id : Math.floor(Math.random() * 100),
            name : name,
            task : task,
        }                                                           
        record.push(obj);
        res.redirect('back');
    }
});

app.get('/deldata',(req,res)=>{
    let delid = req.query.id;
    let newrecord = record.filter((val)=>{
        if(val.id != delid){
            return val;
        }
    });
    record = newrecord;
    res.redirect('back');
});

app.get('/editdata',(req,res)=>{
    let editid = req.query.id;
    let single = record.filter((val)=>{
        if(val.id == editid){
            return val;
        }
    });
    res.render('update',{
        img: '/abstractColor.jpg',
        img2 : '/artwork.png',
        img3: '/doodle.png',
        img4: '/dynamicToDo_Bootstrap_jquery.png',
        single : single[0]
    });
})

app.get('/cleardata',(req,res)=>{
    let delid = req.query.id;
    let clr = 9090;
        if(clr == delid){
            record = [];
        }
    res.redirect('back');
})

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not ready");
        return false;
    }
    console.log("Server is running on port : "+port);
})