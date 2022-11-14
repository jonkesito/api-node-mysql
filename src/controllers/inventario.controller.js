import { pool } from '../connection.js'

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'Paso algo en el servidor mi pana...'
    })
  }
}


export const getProduct = async (req, res) => {

  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])
    console.log(rows)
    if (rows.length <= 0) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      })
    }
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Paso algo en el servidor mi pana...'
    })
  }
}

export const createProduct = async (req, res) => {

  const { name, cantidad, precio_dolares, precio_bolivares } = req.body


  try {
    const [rows] = await pool.query('INSERT INTO products (name, cantidad, precio_dolares, precio_bolivares) VALUES (?, ?, ?, ?)', [name, cantidad, precio_dolares, precio_bolivares])
    res.send({
      id: rows.insertId,
      name,
      cantidad,
      precio_dolares,
      precio_bolivares
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Paso algo en el servidor mi pana...'
    })
  }
}

export const updateProduct = async (req, res) => {
  const id = req.params.id
  const { name, cantidad, precio_dolares, precio_bolivares } = req.body
  console.log(name, cantidad, precio_dolares, precio_bolivares)

  try {
    const [result] = await pool.query('UPDATE products SET name = ?, cantidad = ?, precio_dolares = ?, precio_bolivares = ? WHERE id = ?', [name, cantidad, precio_dolares, precio_bolivares, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'no se encontro ningun producto'
      })
    }

    const [rows] = await pool.query('SELECT * FROM products WHERE  id = ?', [id])
    res.json(rows)

  } catch (error) {
    return res.status(500).json({
      message: 'Paso algo en el servidor mi pana...'
    })
  }

}


export const modifierProduct = async (req, res) => {
  const id = req.params.id
  const { name, cantidad, precio_dolares, precio_bolivares } = req.body

  try {
    const [result] = await pool.query('UPDATE products SET name = IFNULL(?, name), cantidad = IFNULL(?, cantidad), precio_dolares = IFNULL(?, precio_dolares), precio_bolivares = IFNULL(?, precio_bolivares) WHERE id = ?', [name, cantidad, precio_dolares, precio_bolivares, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'no se encontro ningun producto'
      })
    }

    const [rows] = await pool.query('SELECT * FROM products WHERE  id = ?', [id])
    res.json(rows)

  } catch (error) {
    return res.status(500).json({
      message: 'Paso algo en el servidor mi pana...'
    })
  }

}

export const deleteProduct = async (req, res) => {
  const id = req.params.id

  try {

    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id])

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: 'No se econtro el servidor mi pana'
      })
    }

    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'Paso algo en el servidor mi pana...'
    })
  }
}






