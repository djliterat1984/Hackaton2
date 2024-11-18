const {db} = require("../config/db.js");

const getAllStudentsDB = () =>  {
    return db('students').select("id", "name", "debt");
}

const getStudentByIdDB = (id) => {
    return db('students').select("id", "name", "debt").where({id});
}

const insertStudentDB = (name, debt) => {
    return db('students').insert( {name, debt},  ["id", "name", "debt"]);
}

const updateStudentDB = (id, name, debt) => {
    const updateData = {};
    if(name !== undefined) updateData.name = name;
    if(debt !== undefined) updateData.debt = debt;

    if(Object.keys(updateData).length == 0) {
        return Promise.resolve({message: "No updated fields provided"});
    }
    return db("students").where({id}).update(updateData, ["id", "name", "debt"]);
}

const  deleteStudentByIdDB = (id) => {
    return db('students').where({id}).del().returning(["id", "name", "debt"]);
}

module.exports = {
    getAllStudentsDB,
    getStudentByIdDB,
    insertStudentDB,
    updateStudentDB,
    deleteStudentByIdDB
}