const mysql = require("mysql2/promise");
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

class clase{
    tabN = "clase";
    tabPk = "idClase";

    pool = mysql.createPool({
        host: "localhost",
        user: "gbo",
        database: "horario",
        password: "Gvb1312123",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    C=(cl,pr,pat,mat,url)=>{  //Crear clase
            let sql = "INSERT INTO "+this.tabN+"(idClase,clase,prof,pat,mat,url) VALUES(NULL,?,?,?,?,?)";
            try{                                                                    
                this.pool.query(sql,[cl,pr,pat,mat,url]);
                return true;
            }
            catch(er){
                console.log(sql+" | CC: "+er);
                return false;
            }
    }
    
    R = async (id="undefined")=>{
        let data;
        let sql = "SELECT * FROM "+this.tabN;
        if (id!=undefined)
            sql+= " WHERE "+this.tabPk+" = "+id; 
        try{
            data = await this.pool.query(sql);
            data = data[0];
        }
        catch(er){
            console.log(sql+" | CR: "+er);
        }
        return data;
    }

    U=(cl,pr,pat,mat,url,id)=>{
            let sql="UPDATE "+this.tabN+" SET clase=?,prof=?,pat=?,mat=?,url=? WHERE "+this.tabPk+" = ?";
            try{
                this.pool.query(sql,[cl,pr,pat,mat,url,id]);
                return true;
            }
            catch(er){
                console.log(sql+" | CU: "+er);
                return false;
            }
    }

    D=(id)=>{
        let sql = "DELETE * FROM "+this.tabN+" WHERE "+this.tabPk+" = ?";
        try {
            this.pool.query(sql,[id]);
        } catch (er) {
            console.log(sql+" | CD: "+er);
            return false;
        }
    }
}

module.exports = clase;