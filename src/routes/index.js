import Router from 'express'
import Post from '../models/post.js'


const router = Router()

router.get('/', async (req, res)=>{
    try{
        let perPage = 5
        let page = req.query.page || 1;
    
        const posts = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip (perPage * page - perPage)
        .limit (perPage)
        .exec();
    
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        res.render('main.ejs', {
        posts,
        current: page,
        nextPage: hasNextPage? nextPage: null
    });
    }

    catch(err){
        console.log(err)
    }
})


router.post('/create', async(req, res)=>{
    const {title, body} = req.body
    console.log(title)
    console.log(body)

    try{
        const newPost = await Post.create({
            title: title,
            body: body
        })
        await newPost.save()
        res.send(200)
    }
    catch(err){
        console.log(err)
    }})


    router.get('/post/:id', async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).send('Post not found');
            }
            console.log('Fetched post:', JSON.stringify(post));
            res.render('post', {
                title: post.title,
                body: JSON.stringify(post.body)
            });
        } catch (error) {
            console.error('Error fetching post:', error);
            res.status(500).send('Server error');
        }
    });
      

    router.get('/create-post', async (req, res) => {
    res.render('createPost.ejs')
    })

router.get('/shi', async(req, res)=>{
    res.render('shi.ejs')
})

router.post('/savePost', async (req, res) => {
    try {
        const { title, body } = req.body;
        console.log('Received post data:', { title, body: JSON.stringify(body) });

        const newPost = new Post({ title, body });
        await newPost.save();
        
        console.log('Saved post:', JSON.stringify(newPost));
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).json({ error: 'Failed to save post' });
    }
});
export default router