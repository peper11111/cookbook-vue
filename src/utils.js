export function assert (condition, msg) {
  if (!condition) {
    throw new Error(('[cookbook] ' + msg))
  }
}
