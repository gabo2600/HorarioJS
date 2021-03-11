const fs = require("fs");
/*
{
    clase: "",
    prof: "",
    pat: "",
    mat: "",
    url: ""
}
*/
const Path = "./DB/clases.json";

let clase = {
    C: 
        async (cl,pr,pat,mat,url)=>{
            let data;
            try{
                data = await fs.readFileSync(Path);
                data = JSON.parse(data);
                data.push({clase:cl , prof:pr , mat:mat , pat:pat , url:url});
            }
            catch(er){
                data = [];
                data.push({clase:cl, prof:pr, mat:mat, pat:pat , url:url});
                console.log(" e1: "+er);
            }

            try{ 
                data = JSON.stringify(data); 
                fs.writeFileSync(Path,data);
            }
            catch(er){
                console.log(" e2: "+er);
            }
            
        },
    U: 
        async (cl,pr,pat,mat,url,id)=>{
            let data;
            try{
                data = await fs.readFileSync(Path);
                data = JSON.parse(data);
                data[id].clase=cl;
                data[id].prof=pr;
                data[id].mat=mat;
                data[id].pat=pat;
                data[id].url=url;

                data = JSON.stringify(data); 
                fs.writeFileSync(Path,data);
            }
            catch(er){
                console.log(" e1: "+er);
            }
        },
    
    D: 
        async (id)=>{
            let data;
            try{
                data = await fs.readFileSync(Path);
                data = JSON.parse(data);
                data.splice(id,1);

                data = JSON.stringify(data); 
                fs.writeFileSync(Path,data);
            }
            catch(er){
                console.log(" e1: "+er);
            }
        }
};

module.exports = clase;