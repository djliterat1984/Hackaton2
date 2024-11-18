const {db} = require("../config/db.js");

const getAllPaymentMethodsDB = () =>  {
    return db('payment_methods').select("method_id", "name", "active");
}

const getPaymentMethodByIdDB = (method_id) => {
    return db('payment_methods').select("method_id", "name", "active").where({method_id});
}

const insertPaymentMethodDB = (name, active) => {
    return db('payment_methods').insert( {name, active},  ["method_id", "name", "active"]);
}

const updatePaymentMethodDB = (method_id, name, active) => {
    const updateData = {};
    if(name !== undefined) updateData.name = name;
    if(active !== undefined) updateData.active = active;

    if(Object.keys(updateData).length == 0) {
        return Promise.resolve({message: "No updated fields provided"});
    }
    return db("payment_methods").where({method_id}).update(updateData, ["method_id", "name", "active"]);
}

const  deletePaymentMethodDB = (method_id) => {
    return updatePaymentMethodDB(method_id,undefined,false);
}

module.exports = {
    getAllPaymentMethodsDB,
    getPaymentMethodByIdDB,
    insertPaymentMethodDB,
    updatePaymentMethodDB,
    deletePaymentMethodDB
}