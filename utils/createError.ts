interface ErrorWithStatus extends Error {
  status: number;
}

export default ({ message, status }: { message: string; status: number }) => {
  const error = new Error() as ErrorWithStatus;
  error.message = message;
  error.status = status;

  return error;
};
