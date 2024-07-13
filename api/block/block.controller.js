import { blockService } from "./block.service.js"

export async function getBlocks(req, res) {
    try {
        const blocks = await blockService.query()
        res.json(blocks)
    } catch (error) {
        res.status(500).send({ error: 'Failed to get blocks' })
    }
}

export async function getBlockById(req, res) {
    try {
        const { blockId } = req.params
        const block = await blockService.getById(blockId)
        res.json(block)
    } catch (error) {
        res.status(500).send({ error: `Failed to get block, id: ${blockId}` })
    }
}