class NotImplementedError extends Error {
  constructor() {
    super('Not implemented');
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference
    Error.captureStackTrace(this, this.constructor);
  }
}

const rejectNotImplemented = () => Promise.reject(new NotImplementedError());

module.exports = {
  NotImplementedError,
  rejectNotImplemented
};
