import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'

export const blockService = {
    query,
    getById,
}


async function query() {
    try {
        const collection = await dbService.getCollection('block')
        const blocks = await collection.find().sort({ _id: 1 }).toArray()
        return blocks
    } catch (error) {
        console.log('Had trouble finding blocks', error)
        throw error
    }
}

async function getById(blockId) {
    try {
        const collection = await dbService.getCollection('block')
        const block = await collection.findOne({ _id: new ObjectId(blockId) })
        return block

    } catch (error) {
        console.log(`Had trouble finding block ${blockId}`, error)
        throw error
    }
}