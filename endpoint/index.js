import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
var colors = require('colors');

const app = new Express();
const server = new http.Server(app);
const logPath = __dirname + '/../logs/api.log';
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

app.set('trust proxy', 1);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

server.listen(3030, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`
                                                     .,,,, 
                                              ,;;;;;;,.    
    Nebulis Endpoint                    ,;;;;:             
    Code Monitoring                 :;;;,                  
    v%s                      :;;;                       
                            .;;;.                          
                         .;;;               .:;;;;;;;;;;.  
                       ;;;,             ;;;';.      ,;;;;; 
                     ;;;.             :,              :;;; 
                   :;;                                ;;;  
                  ;;;           :;;;;;;              ;;;   
                 .;;;;       ;;;;;;;;               ;;;    
                  ;;;;;,   :;;;;;,   .;,          :;;      
                                   ;;;;         :;;.       
                                .;;;;:        ;;;.         
                              ;;;;;        ,;;:            
 '                        ,;;;;;         ';,               
.;;;                 .;;;;;;.         ';                   
  ;;;;;;::,,::;;;;;;;;;:.                                  
     ,:;;;;;;;;;:,.                                        
     `.yellow, '0.1.0');
  console.log('Nebulis endpoint is connected');
});
