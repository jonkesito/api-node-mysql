import { Router } from 'express'

import { createProduct, deleteProduct, getProduct, getProducts, modifierProduct, updateProduct } from '../controllers/inventario.controller.js'

const router = Router()

router.get('/inventario', getProducts)

router.get('/inventario/:id', getProduct)

router.post('/inventario', createProduct)
//
router.put('/inventario/:id', updateProduct)
//
router.patch('/inventario/:id', modifierProduct)

router.delete('/inventario/:id', deleteProduct)

export default router
