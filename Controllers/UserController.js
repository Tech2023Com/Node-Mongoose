const UserSchema = require('../Schemas/UserSchema')



exports.bhanu = (req,res) =>{
res.send('<h1>This is new Server</h1>')
}


exports.sum = (req,res)=>{
    var x = parseInt(req.query.n1) + parseInt(req.query.n2)
    res.send(x.toString())
}


exports.resgiter= (req,res)=>{
    res.send(`
    
    <form method="GET" action="/user/message"   >
    <input placeholder="Enter your name" name="name"  />
    <input placeholder="Enter your email"  name="email"  />
    <button>Submit</button>
    </form>
    `)
}


exports.message = (req,res)=>{

    const {name , email} =  req.query

    UserSchema.insertMany({name : name ,  email : email}).then((result)=>{
        console.log(result)
        res.send("USer Created")

    }).catch((err)=>{
        console.log(err)
        res.send('Something Went Wrong')
    })


}
