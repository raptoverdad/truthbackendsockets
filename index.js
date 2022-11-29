const express = require('express');
const app = express();
const http = require('http');
const mysql=require('mysql');
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

io.on('connection',(socket)=>{ 


    function sendVotes(){
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
        conector.query('SELECT * FROM surveys',(err,results,field)=>{
        if(err){
            console.log('err:',err)
            socket.emit('error')
          }else if(results){
         for (let i = 0; i < results.length; i++) {
                if(results[i].miningvote === "minafacil"){
                    minafacilvotes++;
                } if(results[i].miningvote === "flockpool"){
                    flockpoolvotes++
                } if(results[i].miningvote === "raptorhash"){
                    raptorhashvotes++
                } if(results[i].miningvote === "raptoreumzone"){
                   raptoreumzonevotes++
                } if(results[i].sharenodesvote === "inodez"){
                    inodezvotes++
                 } if(results[i].sharenodesvote === "sullynode"){
                    sullynodevotes++
                 }
                  if(results[i].developerswork === "fast"){
                    fastvotes++
                 }
                  if(results[i].developerswork === "slow"){
                    slowvotes++
                 }  if(results[i].youtubersvote === "bit"){
                    bitvotes++
                 }
                  if(results[i].youtubersvote === "charlie"){
                    charlievotes++
                 }
                  if(results[i].youtubersvote === "verdad"){
                    verdadvotes++
                 }  if(results[i].youtubersvote === "rabid"){
                    rabidvotes++
                 }  if(results[i].chanvote === "zlatachan"){
                    zlatachanvotes++
                 } if(results[i].chanvote === "verdadchan"){
                    verdadchanvotes++
                 }
                  if(results[i].rainsvote === "yes"){
                    yesvotes++
                 }
                  if(results[i].rainsvote === "no"){
                    novotes++
                 }
      
            }
            console.log('bitvotes',bitvotes)
     io.sockets.emit('surveysvotes',{minafacilvotes,flockpoolvotes,raptoreumzonevotes,raptorhashvotes,inodezvotes,sullynodevotes,fastvotes,slowvotes,bitvotes,charlievotes,verdadvotes,rabidvotes,zlatachanvotes,verdadchanvotes,yesvotes,novotes}) 
    }})}
        

socket.on('chatVisitor',(token)=>{

conector.query('SELECT * FROM CHAT',(err,result,field)=>{
if(err){
    console.log('err:',err)
    socket.emit('error')
  }else if(result){
    socket.emit('chatMessages',result)
  }else if(field){
    console.log('field:',field)
  }
})
})

socket.on('surveysVisitor',(token)=>{
            
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
    conector.query('SELECT * FROM surveys',(err,results,field)=>{
    if(err){
        console.log('err:',err)
        socket.emit('error')
      }else if(results){


 
        
        for (let i = 0; i < results.length; i++) {
            if(results[i].miningvote === "minafacil"){
                minafacilvotes++;
            } if(results[i].miningvote === "flockpool"){
                flockpoolvotes++
            } if(results[i].miningvote === "raptorhash"){
                raptorhashvotes++
            } if(results[i].miningvote === "raptoreumzone"){
               raptoreumzonevotes++
            } if(results[i].sharenodesvote === "inodez"){
                inodezvotes++
             } if(results[i].sharenodesvote === "sullynode"){
                sullynodevotes++
             }
              if(results[i].developerswork === "fast"){
                fastvotes++
             }
              if(results[i].developerswork === "slow"){
                slowvotes++
             }  if(results[i].youtubersvote === "bit"){
                bitvotes++
             }
              if(results[i].youtubersvote === "charlie"){
                charlievotes++
             }
              if(results[i].youtubersvote === "verdad"){
                verdadvotes++
             }  if(results[i].youtubersvote === "rabid"){
                rabidvotes++
             }  if(results[i].chanvote === "zlatachan"){
                zlatachanvotes++
             } if(results[i].chanvote === "verdadchan"){
                verdadchanvotes++
             }
              if(results[i].rainsvote === "yes"){
                yesvotes++
             }
              if(results[i].rainsvote === "no"){
                novotes++
             }
  
        }
        console.log('bitvotes',bitvotes)
        socket.emit('surveysvotes',{minafacilvotes,flockpoolvotes,raptoreumzonevotes,raptorhashvotes,inodezvotes,sullynodevotes,fastvotes,slowvotes,bitvotes,charlievotes,verdadvotes,rabidvotes,zlatachanvotes,verdadchanvotes,yesvotes,novotes})  
  

}
else if(field){
        console.log('field:',field)
 }
    })
    })

    socket.on('surveyvote',(data)=>
{
    console.log('voto',data.vote)

conector.query(`SELECT * FROM users WHERE email='${data.email}'`,(err,results,fields)=>{
    if(err){
        socket.emit('permission') 
        console.log(err)
    
    }else if(!results){
        socket.emit('permission') 
    }else if(!results[0]){
        socket.emit('permission') 
    }else if( results[0].email != data.email ){
        socket.emit('permission') 
    }else if(results[0].email== data.email){
        console.log('valid email')
        let surveyquery=`SELECT * FROM surveys WHERE useremail='${data.email}'`

        conector.query(surveyquery, function (error, result, fields){
          console.log(result)
                if(error){
                    socket.emit('error')
                    console.log(error)
                 }else if(!result[0]){
                    socket.emit('error')
                    console.log('here')
                 }else if(result[0]){
                    
                    if(data.vote==='raptoreumzone' || data.vote==='flockpool' || data.vote==='minafacil' || data.vote==='raptorhash'){
          
                        let surveyquery2=`UPDATE surveys SET miningvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        conector.query(surveyquery2,(updateError,updateResults,updateFields)=>{
                            if(updateError){
                               socket.emit('update-error')
                   
                            }else{
                            sendVotes()
                            }
                        })
                     }else if(data.vote==='sullynode' || data.vote==='inodez'){
                        let surveyquery3=`UPDATE surveys SET sharenodesvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        conector.query(surveyquery3,(updateError,updateResults,updateFields)=>{
                            if(updateError){
                               socket.emit('update-error')
                            }else{
                            sendVotes()
                            }
                        })
                     }else if(data.vote==='fast' || data.vote==='slow'){
                        let surveyquery4=`UPDATE surveys SET developerswork = '${data.vote}' WHERE useremail = '${data.email}'`
                        conector.query(surveyquery4,(updateError,updateResults,updateFields)=>{
                            if(updateError){
                               socket.emit('update-error')
                            }else{
                            sendVotes()
                            }
                        })
                     }else if(data.vote==='bit' || data.vote==='verdad' || data.vote==='rabid'  || data.vote==='charlie'){
                        let surveyquery5=`UPDATE surveys SET youtubersvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        conector.query(surveyquery5,(updateError,updateResults,updateFields)=>{
                            if(updateError){
                               socket.emit('update-error')
                            }else{
                            sendVotes()
                            }
                        })
                     }
                     else if(data.vote==='zlatachan' || data.vote==='verdadchan'){
                        let surveyquery5=`UPDATE surveys SET chanvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        conector.query(surveyquery5,(updateError,updateResults,updateFields)=>{
                            if(updateError){
                               socket.emit('update-error')
                            }else{
                            sendVotes()
                            }
                        })
                     }    else if(data.vote==='yes' || data.vote==='no'){
                        let surveyquery6=`UPDATE surveys SET rainsvote = '${data.vote}' WHERE useremail = '${data.email}'`
                        conector.query(surveyquery6,(updateError,updateResults,updateFields)=>{
                            if(updateError){
                               socket.emit('update-error')
                            }else{
                            sendVotes()
                            }
                        })
                     }
                 }
                
            
         
               
        })
       
      
    }
})
})

socket.on('new-message',(data)=>
{

console.log('remember to validate this!',data)
let sql1=`SELECT * FROM users WHERE username='${data.user}' and email='${data.email}' and profilepicture='${data.profilepicture}'`

conector.query(sql1, function (error, results, fields){
    if(error){
        socket.emit('permission') 
    
    }else if(!results){
        socket.emit('permission') 
    }else if(!results[0]){
        socket.emit('permission') 
    }else if(results[0].username != data.user){
        socket.emit('permission') 
    }else if(results[0].username == data.user && results[0].email== data.email && results[0].profilepicture== data.profilepicture){

        let sql2=`INSERT INTO chat (user, mensaje,profilepicture) VALUES ('${data.user}', '${data.message}', '${data.profilepicture}');`
        conector.query(sql2, function (error, results, fields){
            if(error){
                socket.emit('message-status',{success:'false'})
          
            }else{
                let sql3 = `SELECT * FROM chat`
                conector.query(sql3, function (error, results, fields){
                    if(error){
                        socket.emit('message-status')
                        console.log('here')
                    }else if(!results){
                        socket.emit('message-status')
                        console.log('here1')
                    }else if(!results[0]){
                        socket.emit('message-status') 
                        console.log('here2')
                    }
                    else if(results[0].user != ''){
                        io.sockets.emit('chatMessages',results)
                        
                      
                    }
                })
              
            }
        })
       
      
    }
})
})

})

  
