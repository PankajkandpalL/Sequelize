const { Sequelize, seq } = require("../configs/dbConfig");

// Schema:- name:string, email:string,batch:Integer(foreignkey)

const student = seq.define("studentTable", {
  name: {
    type: Sequelize.DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  batch : {
    type : Sequelize.DataTypes.STRING,
    references: {
      model: 'batchTable',
      key: 'userId'
    }
  }
});


module.exports = Users 
