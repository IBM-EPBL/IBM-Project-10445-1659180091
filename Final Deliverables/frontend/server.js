const express=require("express")
const app=express();

app.use(express.static('/'));

app.use('/css',express.static(__dirname+'/css'));
app.use('/js',express.static(__dirname+'/js'));
app.use('/assets',express.static(__dirname+'/assets'));

const server=app.listen(5000,()=>{
	const port=server.address().port;
	console.log("Server started at http://localhost:%s",port);
});
