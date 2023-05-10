const UserSchema = require('../Schemas/UserSchema')

const bcrypt = require('bcrypt')


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
    <input placeholder="Enter your email"  name="mobile"  />
    <input placeholder="Enter your password"  name="password"  />
    <button>Submit</button>
    </form>
    `)
}


exports.message = (req,res)=>{

        bcrypt.genSalt(10 ,  function(err ,salt ){
            if(err)
            {
                res.send("Something went wrong")
            }
            else
            {
                        bcrypt.hash( req.query.password , salt , function(err ,  hash){
                            if(err)
                            {
                                res.send("Something went wrong")
                            }
                            else
                            {
                                const {name , email , mobile } =  req.query

                                UserSchema.insertMany({name : name ,  email : email , mobile:  mobile , password : hash}).then((result)=>{
                                    console.log(result)
                                    res.send("USer Created")
                            
                                }).catch((err)=>{
                            
                                    console.log(err.name)
                                    console.log(err.code)
                                    console.log(err.message)
                                    console.log(err.errors)
                                    
                                    if(err.name == "ValidationError")
                                    {
                                            res.send(`${err.message.split(":")[1]} is Required`)
                            
                                    }
                                    else if(err.code == 11000 && err.name == 'MongoBulkWriteError'){
                                        res.send(`${err.message.split("{")[1].replace("}" , "").split(':')[1]} alreday exits in database`)
                                    }
                                     else{
                                         res.send('Something Went Wrong')
                            
                                        }
                                })
                            
                            }



                        })
            }
        })



    

}
