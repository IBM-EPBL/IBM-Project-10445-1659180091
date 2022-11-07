import { getter } from "./modules/server.js";
async function fetcher(){
    let arr=["recommended","headline","sport", "tech", "world", "finance", "politics", "business","economics", "entertainment", "beauty", "travel", "music", "food", "science", "cricket"]
    let t=await getter("news/headline");
    for(const a of arr){
        console.log(a)
        let t1=await getter(`news/${a}`);
        console.log(t1);
    }
}
fetcher()