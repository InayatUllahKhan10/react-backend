const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//express app
const app = express();
const port = 3099;
const BlogPostReact = require('./schema') 
//mpn install cors
const cors= require('cors');


//CONSTANTS
const USER_NAME = 'Inayat';
const PASSWORD = '1234';
const DB_NAME = 'Mern';
const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.2affj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`



//middleware & static files
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


mongoose.connect(dbURI)
.then((result)=>{
    console.log('Connected to database')
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})
.catch((err)=>{
    console.log("Failed to connect to the database");
    process.exit(1);   //process.exit(0) indicates a successful termination.
   // process.exit(1) (or any non-zero value) indicates that the process is terminating due to an error or some other issue.
})


//Create 100 blogs

// for(let i=0;i<100;i++){
//     let blog={
//         "title":title ${i},
//         "summary":summary ${i},
//         "content":content ${i},
//         "author":author ${i}
//     }
//     BlogPostReact.create(blog)
//     .then((result)=>{
//         console.log("created");
        
//     })
//     .catch((err)=>{
//         console.log(err);
        
//     })
// }

app.get('/' , (req, res)=>{
    res.send("Home Page/default page");
})

app.get('/blogs' , (req , res)=>{
    BlogPostReact.find().sort({createdAt: -1 })
    .then((blogs)=>{
        res.json(blogs);
    })
    .catch((error)=>{
        res.status(500).send("Error retrieving blogs");
    })
})

app.get('/blogs/:id' , (req , res)=>{
    BlogPostReact.findById(req.params.id)
    .then((blog)=>{
        if(!blog){
            return res.status(404).send("blog not found");
        }
        res.json(blog);
    })
    .catch((err)=>{
        res.status(500).send('Error retrieving the blog');   
    })
})

app.post('/blogs' , (req , res)=>{
    const blog = req.body;
    BlogPostReact.create(blog)
    .then((createdBlog)=>{
        res.status(201).json(createdBlog);
    })
    .catch((err)=>{
        res.status(500).send('Error creating the blog'); 
    })
})

app.delete('/blogs/:id' , (req , res)=>{
    BlogPostReact.findByIdAndDelete(req.params.id)
    .then((deletedBlog)=>{
        if(!deletedBlog){
            return res.status(404).send("blog not found");
        }
        res.json(deletedBlog);
    })
    .catch((err)=>{
        res.status(500).send('Error deleting the blog');
        
    })
})