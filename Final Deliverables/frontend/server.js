const express=require("express")
const app=express();

app.use(express.static('/'));

const server=app.listen(5000,()=>{
	const port=server.address().port;
	console.log("Server started at http://localhost:%s",port);
});
