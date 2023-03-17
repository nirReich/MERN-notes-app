class HttpError extends Error {
    constructor (messege?:string){
        super (messege);
        this.name = this.constructor.name
    }
}

/**
 * status code 401
 */
export class UnauthorizedError extends HttpError {}

/**
 * status code 409
 */
export class ConflictError extends HttpError {}