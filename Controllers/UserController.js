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
                console.log(err)
                res.send("Something went wrong")
            }
            else
            {
                bcrypt.hash( req.body.password , salt , function(err ,  hash){
                    if(err)
                    {
                                console.log(err)
                                res.send("Something went wrong")
                            }
                            else
                            {
                                const {name , email , mobile } =  req.body

                                UserSchema.insertMany({name : name ,  email : email , mobile:  mobile , password : hash}).then((result)=>{
                                    console.log(result)
                                    res.send("USer Created")
                            
                                }).catch((err)=>{
                                    conosole.log(err)
                            
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



exports.login= (req,res)=>{

    const {email , password} =  req.body


    UserSchema.find({email : email}).then((result)=>{

        console.log(result)
        if(result.length > 0)
        {
            bcrypt.compare(password , result[0].password , function(err,status){
                if(err)
                {
                    res.send("Something Went Wrong")
                }
                else
                {
                    if(status == true)
                    {
                        var temp = result[0]
                        delete temp['password']

                        res.send({message : "User Login Succesfull" , data : temp})
                    }
                    else
                    {
                        res.send({message : "Incorrect Password" , data : []})

                    }
                }
            }  )
            
        }
        else
        {
            res.send('User Not Found')

        }


    }).catch((err)=>{

        console.log(err)

        res.send(err)

    })



}
