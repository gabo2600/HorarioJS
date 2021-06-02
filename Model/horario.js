const mysql = require("mysql2/promise");
const Path = "./DB/horario.json";

class h {
    tabN = "horario";
    tabPk = "idHorario";

    pool = mysql.createPool({
        host: "localhost",
        user: "gbo",
        database: "horario",
        password: "Gvb1312123",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    C = (dia, clase, hi, hf) => {
        let sql = "INSERT INTO "+this.tabN+"("+this.tabPk+",hi,hf,idClase,idDia) VALUES(NULL,?,?,?,?)";
        try {
            this.pool(sql,[hi,hf,clase,dia]);
            return true;
        } catch (er) {
            console.log(sql+" | HC: " + er);
            return false;
        }
    };

    R = async (where) => {
        let sql = "select * from (select * from clase NATURAL JOIN horario) as t1 natural join dia ";
        let data;
        if (where!=undefined)
            sql+= " "+where;

        try {
            data = await this.pool.query(sql);
            data = data[0];
        } catch (er) {
            console.log(sql+" |HR: " + er);
            return undefined;
        }
        return data;
    };

    U = (dia, entrada, clase, hi, hf) => {
        let sql = "UPDATE "+this.tabN+" SET hi=?,hf=?,idClase=? WHERE dia=? AND "+this.tabPk+" = ?";
        try {
            this.pool(sql,[hi,hf,clase,dia,entrada]);
            return true;
        } catch (er) {
            console.log(sql+" | HU: " + er);
            return false;
        }
    };
    
    D = (e) => {
        let sql = "DELETE FROM "+this.tabN+" WHERE "+this.tabPk+" = ?";
        try {
            this.pool(sql,[e]);
            return true;
        } catch (er) {
            console.log(sql+" | HD: " + er);
            return false;
        }
    };

    QUERY= async(sql)=>{
        let data = undefined;
        try {
            data = await this.pool(sql);
            data = data[0];
            
        }catch(er){
            data = undefined;
            console.log(sql+" |HQ :"+er);
        }
        return data;
    }
}

module.exports = h;
