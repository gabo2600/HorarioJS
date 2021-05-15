const fs = require("fs");
const modelH = require("./horario");
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
const Path2 = "./DB/horario.json"

let clase = {
    C:           //Crear clase
        async (cl,pr,pat,mat,url)=>{
            let data,id=0;
            try{                                                                    
                data = await fs.readFileSync(Path);
                data = JSON.parse(data);

                if (data.length>0){
                    id = data[data.length-1].id;
                    id++;
                }
                data.push({id:id,clase:cl , prof:pr , mat:mat , pat:pat , url:url});
            }
            catch(er){
                data = [];
                data.push({id:0,clase:cl, prof:pr, mat:mat, pat:pat , url:url});
                console.log(" e1: "+er);
            }

            try{ 
                
                data = JSON.stringify(data); 
                console.log(data);
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
                data = await JSON.parse(data);
                for(let i = 0 ;  i<data.length ; i++){
                    if (data[i].id==id){
                        data[i].clase=cl;
                        data[i].prof=pr;
                        data[i].mat=mat;
                        data[i].pat=pat;
                        data[i].url=url;
                    }
                }
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
                for(let i = 0 ;  i<data.length ; i++)
                    if (data[i].id==id)
                        data.splice(i,1);

                data = JSON.stringify(data); 
                fs.writeFileSync(Path,data);

                try{
                    data = fs.readFileSync(Path2);
                    data = JSON.parse(data);
                    for(let i = 0 ; i< data.length ; i++)
                    {
                        for(let j = 0 ; j<data[i].length ; j++)
                            if (data[i][j].id == id)
                                data[i].splice(j,1);
                    }
                    data = JSON.stringify(data);
                    fs.writeFileSync(Path2,data);
                }
                catch(er){
    
                    console.log(" e1: "+er);
                }
            }
            catch(er){
                console.log(" e2: "+er);
            }
        },
    R:
        ()=>{
            let data
            try{
                data = fs.readFileSync(Path);
                data = JSON.parse(data);
            }
            catch(er){
                data = [];
                console.log(" e1: "+er);
            }
            return data;
        }
};

module.exports = clase;