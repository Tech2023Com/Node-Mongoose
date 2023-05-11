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
                res.status(500).send({status :  500 , message : "Something went wrong"})
            }
            else
            {
                bcrypt.hash( req.body.password , salt , function(err ,  hash){
                    if(err)
                    {
                                console.log(err)
                                res.status(500).send({ status : 500 , message :   "Something went wrong"})
                            }
                            else
                            {
                                const {name , email , mobile } =  req.body

                                UserSchema.insertMany({name : name ,  email : email , mobile:  mobile , password : hash}).then((result)=>{
                                    console.log(result)
                                    res.status(200).send({status :  200 ,  message : "User Created Successfully !!"})
                            
                                }).catch((err)=>{
                                    console.log(err)
                            
                                    console.log(err.name)
                                    console.log(err.code)
                                    console.log(err.message)
                                    console.log(err.errors)
                                    
                                    if(err.name == "ValidationError")
                                    {
                                            res.status(400).send( {status : 400, message : `${err.message.split(":")[1]} is Required`})
                            
                                    }
                                    else if(err.code == 11000 && err.name == 'MongoBulkWriteError'){
                                        res.status(400).send({status : 400, message :  `${err.message.split("{")[1].replace("}" , "").split(':')[1]} alreday exits in database` } )
                                    }
                                     else{
                                         res.status(400).send({status : 400  , message : "Something Went Wrong ):"})
                            
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
                    res.status(500).send({ status :  500 ,  messgae:  "Something Went Wrong"})
                }
                else
                {
                    if(status == true)
                    {
                        var {name , email , mobile , _id} =  result[0]
                         

                        res.status(200).send({ status: 200, message : "User Login Succesfull" , data : [{  id : _id ,  name : name , email : email, mobile : mobile}]})
                    }
                    else
                    {
                        res.status(400).send({ status : 200 , message : "Incorrect Password" , data : []})

                    }
                }
            }  )
            
        }
        else
        {
            res.status(400).send(  {status : 200 , message :  'User Not Found'})

        }


    }).catch((err)=>{

        console.log(err)

        res.status(400).send({status : 400 , message  : "Something Went Wrong"})

    })



}
