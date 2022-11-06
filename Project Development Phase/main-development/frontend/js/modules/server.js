const ipAddr=async()=>{
    let url=`https://jsonip.com/`
    let data=await fetch(url)
    data=await data.json();
    data=data["ip"];
    return data;
}
export const poster=async(endpoint,data)=>{
    let url=`http://127.0.0.1:5000/${endpoint}`
    let ip=await ipAddr();
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
    return retData;
}

export const getter=async(endpoint)=>{
    let url=`http://127.0.0.1:5000/${endpoint}`
    let ip=await ipAddr();
    let retData=await fetch(url,{
        headers:{
            "ip":ip
        },
        credentials:"include"
    });
    retData=await retData.json();
    return retData;
}

