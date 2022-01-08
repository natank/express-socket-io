import express from "express";
import path from "path";
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { logger } from './logger';

const app = express();
const port = 8080; // default port to listen
const httpServer = createServer(app);
const io = new Server(httpServer, {});

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // render the index template
    res.render( "index" );
} );

io.on("connection", socket => {
  logger.info("A user connected");

  socket.on('disconnect', () => {
    logger.info('A user disconnected');
  })
  socket.on('chatToServer', (...args) => {
    logger.info(JSON.stringify(args));
  })

})

// start the express server
httpServer.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );