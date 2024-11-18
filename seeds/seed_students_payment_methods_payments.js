/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // First, delete all existing entries to prevent duplicates.
  await knex('payments').del();
  await knex('payment_methods').del();
  await knex('students').del();

  // Insert sample data into the `payment_methods` table
  const paymentMethods = await knex('payment_methods').insert([
    { name: 'Credit Card', active: true },
    { name: 'Debit Card', active: true },
    { name: 'PayPal', active: true },
    { name: 'Bank Transfer', active: false }, // Example of an inactive method
  ], ['method_id']); // ['method_id'] will return the IDs of inserted rows

  // Insert sample data into the `students` table
  const students = await knex('students').insert([
    { name: 'John Doe', debt: 1500.00 },
    { name: 'Jane Smith', debt: 2000.50 },
    { name: 'Mary Johnson', debt: 500.00 },
  ], ['id']); 


  // Insert sample data into the `payments` table
  const paymentsToInsert = [
    { student_id: students[0].id, method_id: paymentMethods[0].method_id, amount: 50.00 },
    { student_id: students[0].id, method_id: paymentMethods[1].method_id, amount: 60.00 },
    { student_id: students[1].id, method_id: paymentMethods[2].method_id, amount: 150.00 },
    { student_id: students[1].id, method_id: paymentMethods[0].method_id, amount: 50.00 },
    { student_id: students[2].id, method_id: paymentMethods[1].method_id, amount: 25.00 },
  ];
  // Insert valid payments into the `payments` table
  await knex('payments').insert(paymentsToInsert);
};