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

export async function getAllCustomersOrdersById(req, res) {
  try {
    const { id } = req.params;
    const orders = await db.query(`
      select customers.id as customer_id, name, address, phone, description, price, orders.id as order_id from customers
      join orders 
      on customers.id = orders.customers_id
      where customers.id = ${id}
    `);

    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addOrdersBulk(req, res) {
  try {
    const { id } = req.params;
    const { data } = req.body;
    console.log(data);

    let query = 'insert into orders (description, customers_id , price) values';
    data.forEach((item) => {
      query += `('${item.description}', ${id}, '${item.price}'),`;
    });

    query = query.slice(0, query.length - 1);

    query += ' returning description, customers_id, id, price';

    const orders = await db.query(query);

    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
