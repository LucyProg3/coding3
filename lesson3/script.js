// let os=require("os")
// console.log(os.platform())
// let express=require("express")
// let app=express()
// app.use(express.static("../final2"));

// app.get("/",(req,res)=>{
//     res.send("Home Page")
// })

// app.get("/names/:name",(req,res)=>{
//     let name=req.params.name
//     res.send(`<h1>Hello ${name}</h1>`)
// })

// app.get("/google", function(req, res){ 
//     res.redirect("https://www.google.com")
// })


// app.get("/google/:search", function(req, res){ 
//     let search=req.params.search
//     res.redirect(`https://www.google.com/search?q=${search}`)
// })

// app.get("/game",(req,res)=>{
//     res.redirect("index.html")
// })

// app.get("/*",(req,res)=>{
//     res.send("404")
// })


// app.listen(3000,()=>{
//     console.log("Port:3000")
// })

var fs=require("fs")

var newFile="ReadMePleas.txt"
fs.appendFileSync(newFile,"Hi there genius")

let obj={
    "name":"Lucy"
    "fullname":"Lucy"
}
console.log(JSON.stringify(obj))