/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()
  await knex('transactions').insert([
    {
      date: '2023-09-05',
      amount: 3000000,
      type: 'Income',
      description: 'Monthly Salary'
    },
    {
      date: '2023-09-06',
      amount: 500000,
      type: 'Expense',
      description: 'Fashion'
    },
    {
      date: '2023-09-06',
      amount: 100000,
      type: 'Income',
      description: 'Rent Fees'
    }
  ]);
};
