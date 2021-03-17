const fs = require("fs");
const Path = "./DB/horario.json";

let horario = {
    R:
    ()=>{
        let data;
        try{
            data = fs.readFileSync(Path);
            data = JSON.parse(data);
        }
        catch(er){
            fs.writeFileSync(Path,"[[],[],[],[],[],[],[]]");
            data = undefined;
            console.log(" e1: "+er);
        }
        return data;
    },

    U: 
        (dia,entrada,clase,hi,hf)=>{
            try{
                data = fs.readFileSync(Path);
                data = JSON.parse(data);
                data[dia][entrada].id = clase;
                data[dia][entrada].hi = hi;
                data[dia][entrada].hf = hf;
                data = JSON.stringify(data);
                fs.writeFileSync(Path,data); 
            }
            catch(er){
                console.log(" e1: "+er);
            }
        },
    C: 
        (dia,clase,hi,hf)=>{
            try{
                data = fs.readFileSync(Path);
                data = JSON.parse(data);
                data[dia].push({id:clase,hi:hi,hf:hf});
                data = JSON.stringify(data);
                fs.writeFileSync(Path,data);
            }
            catch(er){
                //fs.writeFileSync(Path,"[[],[],[],[],[],[]]");
                console.log(" e1: "+er);
            }
        },
    D: 
        (d,e)=>{
            try{
                data = fs.readFileSync(Path);
                data = JSON.parse(data);
                data[d].splice(e,1);
                data = JSON.stringify(data);
                fs.writeFileSync(Path,data);
            }
            catch(er){

                console.log(" e1: "+er);
            }
        },
};

module.exports = horario;