const express=require("express")
require("./db/mongoose")
const userRouter=require('./routers/usersRouter')
const blogRouter=require('./routers/blogsRouter')
const commentRouter=require('./routers/commentsRouter')
const app= new express()


app.use(express.json())
app.use('/users',userRouter)
app.use('/blogs',blogRouter)
app.use('/comments',commentRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Working on ${process.env.PORT}`)
})