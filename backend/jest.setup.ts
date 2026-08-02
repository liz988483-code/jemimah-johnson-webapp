// Deterministic env for tests, set before any test file imports the app --
// otherwise these fall back to the (weaker) hardcoded defaults in the source.
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-jwt-secret'
process.env.JWT_EXPIRE = '1h'
process.env.ADMIN_EMAIL = 'admin@test.local'
process.env.ADMIN_PASSWORD = 'test-admin-password'
