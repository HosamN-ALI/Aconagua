/**
 * Domain Exception
 * Base exception for all domain-related errors
 */
export class DomainException extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'DomainException';
  }
}

/**
 * Not Found Exception
 */
export class NotFoundException extends DomainException {
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundException';
  }
}

/**
 * Validation Exception
 */
export class ValidationException extends DomainException {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationException';
  }
}

/**
 * Unauthorized Exception
 */
export class UnauthorizedException extends DomainException {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedException';
  }
}
