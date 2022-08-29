const { check, validationResult } = require('express-validator')

exports.validSign = [
    check('firstname')
      .notEmpty()
      .withMessage("Firstname is required")
      .bail()
      .isLength({ min:3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('lastname')
      .notEmpty()
      .withMessage("Lastname is required")
      .bail()
      .isLength({ min:3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('email')
      .notEmpty()
      .withMessage("Email can not be empty")
      .bail()
      .isEmail()
      .withMessage('Must be a valid email address')
      .bail(),
    check('password')
      .notEmpty().withMessage("Password is required").bail()
      .isLength({ min:8 }).withMessage("Password must contain at least 8 characters").bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.json({success: false, errors: errors.array()});
      next();
    }
]

exports.validLogin = [
  check('email')
    .notEmpty()
    .withMessage("Email can not be empty").bail()
    .isEmail()
    .withMessage('Must be a valid email address').bail(),
  check('password')
    .notEmpty().withMessage("Password is required").bail()
    .isLength({ min:8 }).withMessage("Password must contain at least 8 characters").bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({success: false, errors: errors.array()});
    next();
  }
]

exports.validProfile = [
  check('firstname')
    .notEmpty()
    .withMessage("Firstname is required").bail()
    .isLength({ min:3 })
    .withMessage('Minimum 3 characters required!').bail(),
  check('lastname')
    .notEmpty()
    .withMessage("Lastname is required").bail()
    .isLength({ min:3 })
    .withMessage('Minimum 3 characters required!').bail(),
  check('email')
    .notEmpty()
    .withMessage("Email can not be empty").bail()
    .isEmail()
    .withMessage('Must be a valid email address').bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({success: false, errors: errors.array()});
    next();
  }
]

exports.validPass = [
  check('password')
    .notEmpty().withMessage("Password is required").bail()
    .isLength({ min:8 }).withMessage("Password must contain at least 8 characters").bail(),
  check('newPassword')
    .notEmpty().withMessage("New Password is required").bail()
    .isLength({ min:8 }).withMessage("The new Password must contain at least 8 characters").bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({success: false, errors: errors.array()});
    next();
  }
]