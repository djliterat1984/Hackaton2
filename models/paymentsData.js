const {db} = require("../config/db.js");
const { getStudentByIdDB } = require("./studentData.js");

// const getAllPaymentsDB = () => {
//     return db('payments').select("payment_id", "student_id", "method_id", "amount");
// }

const getPaymentByIdDB = (payment_id) => {
    return db('payments').where({payment_id}).select("payment_id", "student_id", "method_id", "amount");
}

// const getPaymentsByStudentDB = (student_id) => {
//   return db('payments').where({student_id}).select("payment_id", "student_id", "method_id", "amount");
// }

// const getPaymentsByMethodDB =(method_id) => {
//   return db('payments').where({method_id}).select("payment_id", "student_id", "method_id", "amount");
// }

// these two need work to figure out how the debt should be displayed properly
const getAllPaymentsDetailsDB = () => {
    return db('payments')
    .select(
      'payments.payment_id',       // Payment ID
      'payments.student_id',       // Student ID
      'students.name as student_name',  // Student's Name
      'payments.method_id',        // Payment Method ID
      'payment_methods.name as method_name', // Payment Method Name
      'payments.amount',           // Payment Amount
      'students.debt'              // Student's Debt
    )
    .join('students', 'payments.student_id', '=', 'students.id')  // Join with students table
    .join('payment_methods', 'payments.method_id', '=', 'payment_methods.method_id')  // Join with payment_methods table
}

const getPaymentDetailsByIdDB = (paymentId) => {
    return db('payments')
    .select(
      'payments.payment_id',       // Payment ID
      'payments.student_id',       // Student ID
      'students.name as student_name',  // Student's Name
      'payments.method_id',        // Payment Method ID
      'payment_methods.name as method_name', // Payment Method Name
      'payments.amount',           // Payment Amount
      'students.debt'              // Student's Debt
    )
    .join('students', 'payments.student_id', '=', 'students.id')  // Join with students table
    .join('payment_methods', 'payments.method_id', '=', 'payment_methods.method_id')  // Join with payment_methods table
    .where('payments.payment_id', paymentId); 
}

const getDetailsByStudentDB = ( student_id ) => {  
  return db('payments')
  .select(
    'payments.payment_id',       // Payment ID
    'payments.student_id',       // Student ID
    'students.name as student_name',  // Student's Name
    'payments.method_id',        // Payment Method ID
    'payment_methods.name as method_name', // Payment Method Name
    'payments.amount',           // Payment Amount
    'students.debt'              // Student's Debt
  )
  .join('students', 'payments.student_id', '=', 'students.id')  // Join with students table
  .join('payment_methods', 'payments.method_id', '=', 'payment_methods.method_id')  // Join with payment_methods table
  .where('payments.student_id', student_id); 
}

const getDetailsByMethodDB = (method_id) => {
  return db('payments')
  .select(
    'payments.payment_id',       // Payment ID
    'payments.student_id',       // Student ID
    'students.name as student_name',  // Student's Name
    'payments.method_id',        // Payment Method ID
    'payment_methods.name as method_name', // Payment Method Name
    'payments.amount',           // Payment Amount
    'students.debt'              // Student's Debt
  )
  .join('students', 'payments.student_id', '=', 'students.id')  // Join with students table
  .join('payment_methods', 'payments.method_id', '=', 'payment_methods.method_id')  // Join with payment_methods table
  .where('payments.method_id', method_id); 
}

const makePayment = async (trx, student_id, method_id, amount) => {
  // attempt to save payment
  const payment = await trx('payments').insert({student_id, method_id, amount}, ["payment_id", "student_id", "method_id", "amount"])
  // subtract from debt
    const [ student ] = await getStudentByIdDB( student_id ); 
    const updatedDebt = parseFloat( student.debt ) - amount;
    const updateStudent = await trx('students').where({id: student_id}).update({debt: updatedDebt}, ["id", "name", "debt"])
    return {payment, updateStudent}  
}

const insertPaymentDB = async (student_id, method_id, amount) => {
    const trx = await db.transaction(); // Start the transaction
    try {
    const result = await makePayment( trx, student_id, method_id, amount );
      await trx.commit();
      return result;
    } catch (error) {
      // If something goes wrong, rollback the transaction
      await trx.rollback();
      console.log("Error:", error);
      throw error; 
    }
};

const modifyPaymentAmount = async (trx, payment_id, newAmount) => {    
    // attempt to retrieve payment
    const [payment] = await getPaymentByIdDB(payment_id);
    const [updatedPayment] = await trx('payments').where({payment_id}).update({amount: newAmount}, ["payment_id", "student_id", "method_id", "amount"]);
    const difference = parseFloat(payment.amount) - newAmount;
    const [student] = await getStudentByIdDB(payment.student_id);
    const updatedDebt = parseFloat(student.debt) + difference;
    const updateStudent = await trx('students').where({id: payment.student_id}).update({debt: updatedDebt}, ["id", "name", "debt"])
    return {updatedPayment, updateStudent}
}

const updatePaymentAmountDB = async (payment_id, newAmount) => {
    const trx = await db.transaction(); // Start the transaction
    try {
      const result = await modifyPaymentAmount(trx, payment_id, newAmount);
      await trx.commit();
      return result;
    } catch (error) {
      // If something goes wrong, rollback the transaction
      await trx.rollback();
      console.log("Error:", error);
      throw error; 
    }
}

const revertPayment = async (trx, payment_id) => {
    
    // attempt to retrieve deleted payment
    const [payment] = await trx('payments').where({payment_id}).del().returning(["payment_id", "student_id", "method_id", "amount"])
    // add to debt
    const [student] = await getStudentByIdDB(payment.student_id);
    const updatedDebt = parseFloat(student.debt) + parseFloat(payment.amount);
    const updateStudent = await trx('students').where({id: payment.student_id}).update({debt: updatedDebt}, ["id", "name", "debt"])
    return {payment, updateStudent}
}

const deletePaymentDB = async (payment_id) => {
    const trx = await db.transaction(); // Start the transaction
    try {
      const result = await revertPayment(trx, payment_id);
      await trx.commit();
      return result;
    } catch (error) {
      // If something goes wrong, rollback the transaction
      await trx.rollback();
      console.log("Error:", error);
      throw error; 
    }
};

module.exports = {
    // getAllPaymentsDB,
    insertPaymentDB,
    updatePaymentAmountDB,
    deletePaymentDB,
    getAllPaymentsDetailsDB,
    getPaymentDetailsByIdDB,
    getDetailsByStudentDB,
    getDetailsByMethodDB,
    // getPaymentsByStudentDB,
    // getPaymentsByMethodDB,
}