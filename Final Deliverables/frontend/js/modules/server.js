const browserData=async()=>{
    let t1=JSON.stringify(window.navigator.userAgentData)
    let t2=window.navigator.userAgent
    let data=t1+t2;
    return data;
}
// URL=`https://159.122.183.93:30582`
URL=`http://localhost:8000`
export const poster=async(endpoint,data)=>{
    let url=`${URL}/${endpoint}`
    let ip=await browserData();
    let retData=await fetch(url,{
        method:"POST",
        mode:"cors",
        headers:{
            "Access-Control-Allow-Origin":"*",
            "content-type":"application/json",
            "ip":ip
        },
        body:JSON.stringify(data),
        credentials:"include"
    });
    retData=await retData.json();
    if(retData["status"]==="not logged in"){
        location.href="login.html"
    }
    return retData;
}

export const getter=async(endpoint)=>{
    let url=`${URL}/${endpoint}`
    let ip=await browserData();
    let retData=await fetch(url,{
        headers:{
            "ip":ip
        },
        credentials:"include"
    });
    retData=await retData.json();
    if(retData["status"]==="not logged in" && endpoint!=="islogin"){
        location.href="login.html"
    }
    return retData;
}

