const Blog = require('../Models/blog')

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

    const blog = new Blog({
        title,
        description,
        image,
        user,
    })
    try {
        await blog.save()
    } catch (error) {
        console.log(error)
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
    Blog.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
}
module.exports = {
    getBlogs,
    addBlog,
    updateblog,
    getById,
    deleteBlog,
}