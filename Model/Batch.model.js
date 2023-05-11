const { Sequelize, seq } = require("../configs/dbConfig");

// Schema:- name:string

const Batch = seq.define("batchTable", {
  name : {
    type : Sequelize.DataTypes.STRING
  }
});


module.exports = { Batch };
