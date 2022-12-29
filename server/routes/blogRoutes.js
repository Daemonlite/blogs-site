const router = require('express').Router()

const {getBlogs,addBlog,updateblog,getById,deleteBlog} = require('../controllers/blogController')

router.get('/',getBlogs)
router.post('/addblog',addBlog)
router.put('/update/:id',updateblog)
router.get('/:id',getById)
router.delete('/:id',deleteBlog)

module.exports = router