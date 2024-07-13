import express from 'express'
import { getBlocks, getBlockById } from './block.controller.js'

export const blockRoutes = express.Router()

blockRoutes.get('/', getBlocks)
blockRoutes.get('/:blockId', getBlockById)