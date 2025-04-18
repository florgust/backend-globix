export class NotFoundError extends Error {
    statusCode: number;

    constructor(message = 'Recurso não encontrado') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

export class BadRequestError extends Error {
    statusCode: number;

    constructor(message = 'Requisição inválida') {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}

export class UnauthorizedError extends Error {
    statusCode: number;

    constructor(message = 'Não autorizado') {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

export class InternalServerError extends Error {
    statusCode: number;

    constructor(message = 'Erro interno do servidor') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
    }
}