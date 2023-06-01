import { ValidationError } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

// Función para lanzar errores HTTP
export function throwHttpException(error: any) {
  if (Array.isArray(error) && error.every((item) => item instanceof ValidationError)) {
    // Manejar errores de Class Validator
    const validationErrors: ValidationError[] = error;
    const formattedErrors = formatValidationErrors(validationErrors);
    throw new HttpException(
      { message: 'Validation failed', errors: formattedErrors },
      HttpStatus.BAD_REQUEST,
    );
  } else {
    // Manejar errores generales
    const message = error.message || 'Internal server error';
    const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw new HttpException(message, statusCode);
  }
}

// Función para formatear los errores de Class Validator
function formatValidationErrors(errors: ValidationError[]): Record<string, string[]> {
  const formattedErrors: Record<string, string[]> = {};
  errors.forEach((error) => {
    Object.entries(error.constraints).forEach(([key, value]) => {
      if (!formattedErrors[key]) {
        formattedErrors[key] = [];
      }
      formattedErrors[key].push(value);
    });
  });
  return formattedErrors;
}
