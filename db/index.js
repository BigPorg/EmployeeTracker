const connection = require("./connection");

class DB {

    constructor(connection) {
        this.connection = connection;
    }

    findEmployees() {
        return this.connection.query(

        );
    }

    findManagers(employeesID) {
        return this.connection.query()
    }





}