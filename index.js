const express = require('express');
const app = express();
const http = require('http');
const {createPool}=require('mysql2/promise')
const server = http.createServer(app);
const {MYSQL_DATABASE,MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,PORT,CORS_ORIGIN,MYSQL_PORT}=require('./config')

const io = require('socket.io')(server,{
    cors:{
        origin:CORS_ORIGIN,
        methods:["GET","POST"],
        allowedHeaders:["Access-Control-Allow-Origin"],
        credentials:false
    }
});

server.listen(PORT,()=>{
    console.log(`LISTENING ON ${PORT}`)

})
app.get('/',(req,res)=>{
res.send('hi')
})

const conector= createPool({host:MYSQL_HOST,user:MYSQL_USER,password:MYSQL_PASSWORD,port:MYSQL_PORT,database:MYSQL_DATABASE})

io.on('connection',async (socket)=>{ 

 async function sendVotesAllSockets(){

        let [result]=await conector.query('SELECT * FROM surveys')
 
        //si hay algun error // socket.emit('error')
        if(result){
            let minafacilvotes= 0
            let flockpoolvotes=0
            let raptoreumzonevotes=0
            let raptorhashvotes=0
            let inodezvotes=0
            let sullynodevotes=0
            let fastvotes=0
            let slowvotes=0
            let bitvotes=0
            let charlievotes=0
            let verdadvotes=0
            let rabidvotes=0
            let zlatachanvotes=0
            let verdadchanvotes=0
            let yesvotes=0
            let novotes=0
            console.log('sending vote:',result)
            for (let i = 0; i < result.length; i++) {
      
                if(result[i].miningvote === "minafacil"){
                    minafacilvotes++;
                } if(result[i].miningvote === "flockpool"){
                    flockpoolvotes++
                } if(result[i].miningvote === "raptorhash"){
                    raptorhashvotes++
                } if(result[i].miningvote === "raptoreumzone"){
                   raptoreumzonevotes++
                } if(result[i].sharenodesvote === "inodez"){
                    inodezvotes++
                 } if(result[i].sharenodesvote === "sullynode"){
                    sullynodevotes++
                 }
                  if(result[i].developerswork === "fast"){
                    fastvotes++
                 }
                  if(result[i].developerswork === "slow"){
                    slowvotes++
                 }  if(result[i].youtubersvote === "bit"){
                    bitvotes++
                 }
                  if(result[i].youtubersvote === "charlie"){
                    charlievotes++
                 }
                  if(result[i].youtubersvote === "verdad"){
                    verdadvotes++
                 }  if(result[i].youtubersvote === "rabid"){
                    rabidvotes++
                 }  if(result[i].chanvote === "zlatachan"){
                    zlatachanvotes++
                 } if(result[i].chanvote === "verdadchan"){
                    verdadchanvotes++
                 }
                  if(result[i].rainsvote === "yes"){
                    yesvotes++
                 }
                  if(result[i].rainsvote === "no"){
                    novotes++
                 }
      
            }

 
        }
       io.sockets.emit('surveysvotes',{minafacilvotes,flockpoolvotes,raptoreumzonevotes,raptorhashvotes,inodezvotes,sullynodevotes,fastvotes,slowvotes,bitvotes,charlievotes,verdadvotes,rabidvotes,zlatachanvotes,verdadchanvotes,yesvotes,novotes})
    }
    async function sendVotesSocket(){

        let [result]=await conector.query('SELECT * FROM surveys')
 
        //si hay algun error // socket.emit('error')
        if(result){
            let minafacilvotes= 0
            let flockpoolvotes=0
            let raptoreumzonevotes=0
            let raptorhashvotes=0
            let inodezvotes=0
            let sullynodevotes=0
            let fastvotes=0
            let slowvotes=0
            let bitvotes=0
            let charlievotes=0
            let verdadvotes=0
            let rabidvotes=0
            let zlatachanvotes=0
            let verdadchanvotes=0
            let yesvotes=0
            let novotes=0
            console.log('sending vote:',result)
            for (let i = 0; i < result.length; i++) {
      
                if(result[i].miningvote === "minafacil"){
                    minafacilvotes++;
                } if(result[i].miningvote === "flockpool"){
                    flockpoolvotes++
                } if(result[i].miningvote === "raptorhash"){
                    raptorhashvotes++
                } if(result[i].miningvote === "raptoreumzone"){
                   raptoreumzonevotes++
                } if(result[i].sharenodesvote === "inodez"){
                    inodezvotes++
                 } if(result[i].sharenodesvote === "sullynode"){
                    sullynodevotes++
                 }
                  if(result[i].developerswork === "fast"){
                    fastvotes++
                 }
                  if(result[i].developerswork === "slow"){
                    slowvotes++
                 }  if(result[i].youtubersvote === "bit"){
                    bitvotes++
                 }
                  if(result[i].youtubersvote === "charlie"){
                    charlievotes++
                 }
                  if(result[i].youtubersvote === "verdad"){
                    verdadvotes++
                 }  if(result[i].youtubersvote === "rabid"){
                    rabidvotes++
                 }  if(result[i].chanvote === "zlatachan"){
                    zlatachanvotes++
                 } if(result[i].chanvote === "verdadchan"){
                    verdadchanvotes++
                 }
                  if(result[i].rainsvote === "yes"){
                    yesvotes++
                 }
                  if(result[i].rainsvote === "no"){
                    novotes++
                 }
      
            }

 
        }
     sockets.emit('surveysvotes',{minafacilvotes,flockpoolvotes,raptoreumzonevotes,raptorhashvotes,inodezvotes,sullynodevotes,fastvotes,slowvotes,bitvotes,charlievotes,verdadvotes,rabidvotes,zlatachanvotes,verdadchanvotes,yesvotes,novotes})
    }
        


socket.on('chatVisitor',async (token)=>{
try {
let [result]=await conector.query('SELECT * FROM chat')

if(result){
    socket.emit('chatMessages',result)
}else{
     socket.emit('error')
}
} catch (error) {
    console.log('chatVisitor error:',error)
}


})

socket.on('surveysVisitor',async(token)=>{
            
    try {
        sendVotesSocket()
    } catch (error) {
        console.log('surveysvisitor error:',error)
    }

})


socket.on('surveyvote',async (data)=>
{
    console.log('voto',data.vote)

let [result1]=await conector.query(`SELECT * FROM users WHERE email='${data.email}'`)

    if(!result1){
        socket.emit('permission') 
    }else if(!result1[0]){
        socket.emit('permission') 
    }else if( result1[0].email != data.email ){
        socket.emit('permission') 
    }else if(result1[0].email== data.email){
        console.log('valid email')
        let surveyquery=`SELECT * FROM surveys WHERE useremail='${data.email}'`

       let [result2]=await conector.query(surveyquery)
       
                if(!result2[0]){
                    socket.emit('error')
                    console.log('here')
                 }else if(result2[0]){
                    
                    if(data.vote==='raptoreumzone' || data.vote==='flockpool' || data.vote==='minafacil' || data.vote==='raptorhash'){
          
                        let surveyquery2=`UPDATE surveys SET miningvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        let [result3] =await conector.query(surveyquery2)
                        try {
                            if(result3){
                                sendVotes()
                            }
                        } catch (error) {
                            socket.emit('update-error')
                        }

                     }else if(data.vote==='sullynode' || data.vote==='inodez'){
                        let surveyquery3=`UPDATE surveys SET sharenodesvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        let [result4]=await conector.query(surveyquery3)
                        try {
                            if(result4){
                                sendVotes()
                            }
                        } catch (error) {
                            socket.emit('update-error')
                        }
                     }else if(data.vote==='fast' || data.vote==='slow'){
                        let surveyquery4=`UPDATE surveys SET developerswork = '${data.vote}' WHERE useremail = '${data.email}'`
                        let [result5]=await conector.query(surveyquery4)
                        try {
                            if(result5){
                                sendVotes()
                            }
                        } catch (error) {
                            socket.emit('update-error')
                        }
                      
                     }else if(data.vote==='bit' || data.vote==='verdad' || data.vote==='rabid'  || data.vote==='charlie'){
                        let surveyquery5=`UPDATE surveys SET youtubersvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        let [result6]=await conector.query(surveyquery5)
                        try {
                            if(result6){
                                sendVotes()
                            }
                        } catch (error) {
                            socket.emit('update-error')
                        }
                      
                     }
                     else if(data.vote==='zlatachan' || data.vote==='verdadchan'){
                        let surveyquery6=`UPDATE surveys SET chanvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        let [result7]=await conector.query(surveyquery6)
                        try {
                            if(result7){
                                sendVotes()
                            }
                        } catch (error) {
                            socket.emit('update-error')
                        }

                     }    else if(data.vote==='yes' || data.vote==='no'){
                        let surveyquery8=`UPDATE surveys SET rainsvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        let [result8]=await conector.query(surveyquery8)
                        try {
                            if(result8){
                                try {
                                    sendVotesAllSockets()
                                } catch (error) {
                                    console.log('surveysvote error:',error)
                                }
                            }
                        } catch (error) {
                            socket.emit('update-error')
                        }
                     }
                 }
    }

})

socket.on('new-message',async(data)=>
{

console.log('remember to validate this!',data)
let sql1=`SELECT * FROM users WHERE username='${data.user}' and email='${data.email}' and profilepicture='${data.profilepicture}'`

let [result9]=await conector.query(sql1)
if(!result9){
        socket.emit('permission') 
    }else if(!result9[0]){
        socket.emit('permission') 
    }else if(result9[0].username != data.user){
        socket.emit('permission') 
    }else if(result9[0].username == data.user && result9[0].email== data.email && result9[0].profilepicture== data.profilepicture)
    {
       let sql2=`INSERT INTO chat (user, mensaje,profilepicture) VALUES ('${data.user}', '${data.message}', '${data.profilepicture}');`
       let [result10] = await conector.query(sql2)
            if(result10){
                let sql3 = `SELECT * FROM chat`
                let [result11]=await conector.query(sql3)
                    if(!result11){
                        socket.emit('message-status')
                        console.log('here1')
                    }else if(!result11[0]){
                        socket.emit('message-status') 
                        console.log('here2')
                    }
                    else if(result11[0].user != ''){
                        io.sockets.emit('chatMessages',results)
                        
                      
                    }
                
              
            }
   
       
      
    }

})
})