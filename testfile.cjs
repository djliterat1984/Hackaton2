const { getAllPaymentMethodsDB, getPaymentMethodByIdDB, insertPaymentMethodDB, updatePaymentMethodDB, deletePaymentMethodByIdDB } = require("./models/paymentMethodData.js");
const { getAllPaymentsDB, insertPaymentDB, deletePaymentDB, updatePaymentAmountDB, getAllPaymentsDetailsDB, getPaymentDetailsByIdDB, getPaymentsByStudentDB, getPaymentsByMethodDB, getPaymentsDetailsByMethodDB, getPaymentsDetailsByStudentDB } = require("./models/paymentsData.js");
const {getAllStudentsDB, getStudentByIdDB, insertStudentDB, updateStudentDB, deleteStudentByIdDB} = require("./models/studentData.js");

const  testStudentsModel = async() => {
    const students = await getAllStudentsDB();
    console.log("Students")
    console.log(students);
    
    const student1 = await getStudentByIdDB(1);
    console.log("Student 1: ");
    
    console.log(student1);

    console.log("New student")
    const [newStudent] = await insertStudentDB("John Smith", 1505.75);
    console.log(newStudent);
    console.log("Updated");
    
    const updated = await updateStudentDB(newStudent.id, "Bob Hope", 2000);
    console.log(updated);
    console.log(("All students predelete"));
    
    const newList = await getAllStudentsDB();
    console.log(newList);
    console.log("Deleting");
    
    const deletedStudent = await deleteStudentByIdDB(newStudent.id);
    console.log(deletedStudent);
    
}

const testMethodModel = async() => {
    const methods = await getAllPaymentMethodsDB();
    console.log(methods);
    const [method1] = await getPaymentMethodByIdDB(1);
    console.log(method1);
    const updated = await  updatePaymentMethodDB(3, "Zelle");
    console.log(updated)
    console.log("New method");
    const newMethod = await insertPaymentMethodDB("Paybox", true);
    console.log(newMethod);
    const newList = await getAllPaymentMethodsDB();
    console.log(newList);
    console.log("Deactivating");
    const deactive = await deletePaymentMethodByIdDB(newMethod.method_id);
    console.log(deactive);
    
    const lastList = await getAllPaymentMethodsDB();
    console.log(lastList);
}

const testPaymentsModel = async() => {
    // const allDetails = await getAllPaymentsDetailsDB();
    // console.log(allDetails);

    // const details1 = await getPaymentDetailsByIdDB(1);
    // console.log(details1);
    // const student1_payments = await getPaymentsDetailsByStudentDB(1);
    // console.log(student1_payments);
    const methood1_payments = await getPaymentsDetailsByMethodDB(2);
    console.log(methood1_payments);
    
    // const allPayments = await getAllPaymentsDB();

    // console.log(allPayments);
    // const newPayment = await insertPaymentDB(1, 1, 235.50);
    // console.log(newPayment);
    // const deletePayment = await deletePaymentDB(newPayment.payment[0].payment_id)
    // console.log(deletePayment);    
    // const updatedPayment = await updatePaymentAmountDB(11, 300);
    // console.log(updatedPayment);
    // const newList = await getAllPaymentsDB();
    // console.log(newList);

    
}
// testStudentsModel();
// testMethodModel();
testPaymentsModel();