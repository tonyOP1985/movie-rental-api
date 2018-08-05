const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    isGold: {
      type: Boolean,
      required: true
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 10
    }
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(10)
      .required(),
    isGold: Joi.boolean(),
    phone: Joi.string()
      .min(5)
      .max(10)
      .required()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
