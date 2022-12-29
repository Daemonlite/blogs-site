const mongoose = require('mongoose');
const Blog = require('../Models/blog')
const User = require('../Models/user')

const getBlogs = async (req,res) => {
    let blogs;
    try {
        blogs = await Blog.find()
      } catch (error) {
        console.log(error)
      }
      if(!blogs){
        res.status(404).json({message:'No Post found'})
      }
      return res.status(200).json(blogs)
}

const addBlog = async (req,res,next) => {
    const {title,description,image,user} = req.body

    let existingUser;
    try {
      existingUser = await User.findById(user)
    } catch (error) {
      console.log(error)
    }
    if(!existingUser){
      return res.status(400).json({message:"User not found"})
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    })
    try {
       const session = await mongoose.startSession()
       session.startTransaction()
       await blog.save({session})
       existingUser.blogs.push(blog)
       await existingUser.save({session})
       await session.commitTransaction()
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error})
    }
    return res.status(201).json(blog)
}

const updateblog = async (req,res,next) => {
    const {title,description} = req.body
    const blogId = req.params.id
let blog;
try {
     blog = await Blog.findByIdAndUpdate(blogId,{
    title,
    description
   
})
} catch (error) {
console.log(error)    
}
if(!blog){
    return res.status(500).send('unable to update')
}
res.status(200).json(blog)

}

const getById = async (req,res,next) => {
    const id = req.params.id
    let blog;
    try {
        blog = await Blog.findById(id)
    } catch (error) {
        console.log(error)
    }

    if(!blog){
        return res.status(404).send('blog not found')
    }
    return res.status(200).json({blog})

}

const deleteBlog = async (req,res,next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findOneAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" })
}
const getByUserId = async (req,res) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });
}


module.exports = {
    getBlogs,
    addBlog,
    updateblog,
    getById,
    deleteBlog,
    getByUserId,
}