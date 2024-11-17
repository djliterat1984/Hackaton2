/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
        // Create the students table
        knex.schema.createTable('students', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.decimal('debt', 10, 2).notNullable().defaultTo(0);
        }),
        // Create the payment_methods table
        knex.schema.createTable('payment_methods', (table) => {
            table.increments('method_id').primary();
            table.string('name').notNullable();
            table.boolean('active').notNullable().defaultTo(true);
        }),
        // Create the payments table
        knex.schema.createTable('payments', (table) => {
            table.increments('payment_id').primary();
            table.integer('student_id').unsigned().notNullable();
            table
                .foreign('student_id')
                .references('id')
                .inTable('students')
                .onDelete('CASCADE');
            table.integer('method_id').unsigned().notNullable();
            table
                .foreign('method_id')
                .references('method_id')
                .inTable('payment_methods')
                .onDelete('RESTRICT'); // Changed to RESTRICT to prevent deletion
            table.decimal('amount', 10, 2).notNullable();
        }),
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('payments'),
        knex.schema.dropTableIfExists('payment_methods'),
        knex.schema.dropTableIfExists('students'),
    ]);
};
