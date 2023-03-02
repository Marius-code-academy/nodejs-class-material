import db from '../db/db.js';

export async function createNewOrder(req, res) {
  try {
    const { id } = req.params;
    const { description, price } = req.body;

    const order = await db.query(`
      insert into orders (description, customers_id, price)
      values ('${description}', ${id}, ${price})
      returning id, description, customers_id, price
    `);

    res.json(order.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
