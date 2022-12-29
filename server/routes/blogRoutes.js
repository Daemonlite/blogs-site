const router = require('express').Router()

const {getBlogs,addBlog,updateblog,getById,deleteBlog,getByUserId} = require('../controllers/blogController')

router.get('/',getBlogs)
router.post('/addblog',addBlog)
router.put('/update/:id',updateblog)
router.get('/:id',getById)
router.delete('/:id',deleteBlog)
router.get('/user/:id',getByUserId)

module.exports = router