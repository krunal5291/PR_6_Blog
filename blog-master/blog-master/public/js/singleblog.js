document.getElementById("like").addEventListener("click",()=>{
    let url = window.location.href.split("/");
    let id = url[url.length - 1];

    fetch(`http://localhost:8090/blog/like/${id}`,{
        method:"PATCH",
        body:{"content-type":"application/json"},  
    })
    .then(()=>{
        let count = document.getElementById("count").innerHTML 
        document.getElementById("count").innerHTML=Number(count)+1
    })
})

document.getElementById("submit").addEventListener("click",(e)=>{
    e.preventDefault()
    try {
        let url = window.location.href.split("/");
        let id = url[url.length - 1];
        
        let text= document.getElementById("text").value
        let obj = {
            text:text
        }
    
        fetch(`http://localhost:8090/blog/comment/${id}`,{
            method:"PATCH",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(obj)
        })
    } catch (error) {
        console.log(error.message);
    }
})