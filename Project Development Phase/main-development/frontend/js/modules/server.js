const ipAddr=async()=>{
    let url=`https://jsonip.com/`
    let data=await fetch(url)
    data=await data.json();
    data=data["ip"];
    return data;
}
URL=`http://localhost:5000/`
export const poster=async(endpoint,data)=>{
    let url=`${URL}/${endpoint}`
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
    let url=`${URL}/${endpoint}`
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

