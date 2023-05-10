


exports.getAdminInfo = (req, res) => {

    res.send("<h1>I am Admin</h1>")


}

exports.getForm = (req, res) => {
    res.send(`
    <form method="GET" action='/admin/result' >
    <input placeholder="Enter  any number" name="num" />
    <button>Check</button>
    </form>

    `)
}

exports.checkArmstong = (req, res) => {
    console.log(req.query)
    var num = parseInt(req.query.num)
    var pw = req.query.num.length
    var out = 0
    for (let i = 0; i < pw; i++) {
        var rm = num % 10
        console.log("rm", rm)
        num = parseInt(num / 10)
        console.log("num", num)

        out += rm ** pw
        console.log("out", out)
    }

    console.log(out)

    if (out == req.query.num) {
        res.send(`<h1  style="color:green" >${req.query.num} is an Arm Strong Number</h1>`)
    }
    else {
        res.send(` <h1  style="color:red" >${req.query.num} is Not an Arm Strong Number</h1>`)

    }

}