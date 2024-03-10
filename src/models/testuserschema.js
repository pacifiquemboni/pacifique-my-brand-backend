const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const testUserSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // User roles
    default: 'user',
  },
});

// Middleware to hash the password before saving to the database
testUserSchema.pre('save', async function (next) {
  const user = this;

  // Hash the password only if it has been modified or is new
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Replace the plaintext password with the hashed one
    user.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

const testUser = mongoose.model('testUser', testUserSchema);

module.exports = testUser;
