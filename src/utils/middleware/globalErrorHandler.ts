import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  // Optional: log to a service like Sentry, write to DB, etc.
  // await someAsyncLogger(err);

   res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
