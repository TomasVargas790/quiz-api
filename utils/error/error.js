export default function err (message, code) {
  const e = new Error(message);
  if (code) e.status = code;
  return e;
}
