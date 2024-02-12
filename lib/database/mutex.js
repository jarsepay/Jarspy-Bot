// @ts-check

import { pino } from 'pino'
import { logger as _logger } from '../connection.js'

/** @re */
export const ActionType = {
    R: 1,
    READ: 1,
    W: 2,
    WRITE: 2
}

/**
 * Process promises in sequential
 */
export default class DBKeyedMutex {
    /** @type {Map<string, { type: typeof ActionType[keyof typeof ActionType], job: Promise<any> }>} */
    #jobs = new Map()
    /** @type {pino.Logger} */
    logger
    constructor(logger = _logger) {
        this.logger = logger.child({ class: 'mutex' })
    }

    /**
     * @template {Promise<any>} T
     * @param {string} id 
     * @param {typeof ActionType[keyof typeof ActionType]} type 
     * @param {() => T} job 
     * @returns {Promise<Awaited<T>>}
     */
    async mutex(
        id,
        type,
        job
    ) {
        const existing = this.#jobs.get(id)
        // if job already exist and type is same
        // like existing type is read and current type is read
        // only process existing one
        if (existing?.type == type && (existing.type & ActionType.WRITE) !== ActionType.WRITE) {
            return await existing.job
            // if job already exist but different type
        } else if (existing) {
            // wait until existing job is done
            await existing.job
        }

        
        const execJob = job()
		this.#jobs.set(id, {
            type,
            job: execJob
        })
        try {
            return await execJob
        } finally {
            this.#jobs.delete(id)
        }
    }
}