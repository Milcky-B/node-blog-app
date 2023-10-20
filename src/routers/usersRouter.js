const {Router}=require("express")
const Users=require("../model/user")
const authMid=require("../middleware/midAuth")
const router=new Router()

router.post('/',async (req,res)=>{
    try {
        const user=new Users(req.body)
        await user.save()
        const token=await user.createToken()
        res.send({user,token})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login',async(req,res)=>{
    try {
        const user=await Users.findOne({email:req.body.email,password:req.body.password})
        if(!user) return res.status(400).send("Check Email and Password Combination")
        const token=await user.createToken()
        res.send({user,token})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/logout',authMid,async(req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=> token.token!=req.token)
        await req.user.save()
        res.send(`Session Terminated`)
    } catch (err) {
        res.status(400).send("Session doesn't exist")
    }
})

router.post('/logoutall',authMid,async(req,res)=>{
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send(`All Sessions Terminated`)
    } catch (err) {
        res.status(400).send("Session doesn't exist")
    }
})
router.get('/',authMid,async (req,res)=>{
    try {
        res.send(req.user)
    } catch (err) {
        res.status(500).send()
    }
})

router.patch('/',authMid,async(req,res)=>{
    const editables=["name","age","address","password"]
    const objectKey=Object.keys(req.body)
    const filterObjKey=objectKey.filter((vals)=>{ 
        if(editables.includes(vals)) return vals
    })
    try {
        filterObjKey.forEach((obj)=>{
            req.user[obj]=req.body[obj]
        })
        await req.user.save()
        res.send(req.user)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports=router