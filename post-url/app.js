const http=require('http')
const fs=require('fs')
const server=http.createServer((req,res)=>{
    
fs.readFile("Student.json","utf-8",(err,data)=>{
    if(err)
    {
        res.writeHead(500,{
            "content-type":"text/plain"
        })

        res.end("Error occurrred")
        return
    }
    res.writeHead(200,{
        "content-type":"text/application.json"
    })
    res.end(data)
})

})
server.listen(3000,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("server running in port 3000")
})