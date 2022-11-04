export const poster=async(endpoint,data)=>{
    let url=`http://127.0.0.1:5000/${endpoint}`
    let retData=await fetch(url,{
        method:"POST",
        mode:"cors",
        headers:{
            "Access-Control-Allow-Origin":"*",
            "content-type":"application/json",
        },
        body:JSON.stringify(data),
        credentials:"include"
    });
    retData=await retData.json();
    return retData;
}

export const getter=async(endpoint)=>{
    let url=`http://127.0.0.1:5000/${endpoint}`
    let retData=await fetch(url,{
        credentials:"include"
    });
    retData=await retData.json();
    return retData;
}

