import { Request, Response } from 'express'

import { query, getById, update } from './fc.service'
import { tempService } from '../../services'
import { Fc } from '../../types'

async function getFcs(req: Request, res: Response): Promise<void> {
    try {
        const { tower, floor } = req.query as { tower: string, floor: string }
        const fcs: Fc[] = await query(tower, floor)
        res.send(fcs)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find fan coil units' })
    }
}

async function getFc(req: Request, res: Response): Promise<void> {
    try {
        const fcId: string = req.params.id
        const { tower } = req.query as { tower: string }
        const fc: Fc = await getById(tower, fcId)

        res.send(fc)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find fan coil unit' })
    }
}

async function updateFc(req: Request, res: Response): Promise<void> {
    try {
        const fcId: string = req.params.id
        const { tower } = req.query as { tower: string }
        const { field, val } = req.body as { field: string, val: number }
        const newFc: Fc = field === 'interval-alarm' || field === 'temp-sp'
            ? await tempService.updateSpecial(tower, fcId, field, val)
            : await update(tower, fcId, field, val)
        res.send(newFc)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update fan coil unit' })
    }
}

export {
    getFcs,
    getFc,
    updateFc
}

// import { createJsonFiles } from './fc.create'

// createJsonFiles()
