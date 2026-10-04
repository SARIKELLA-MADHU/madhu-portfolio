// Protects write routes. The admin page sends the key in the "x-admin-key" header.
export default function adminAuth(req, res, next) {
  const key = req.header('x-admin-key');
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized: invalid admin key' });
  }
  next();
}
