const Joi = require("joi");
const middleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      var message = details.map((i) => i.message).join(",");
      message = message.replace(/['"]+/g, "");
      res.status(401).send({
        status: false,
        message: message,
        data: "",
      });
    }
  };
};
module.exports = middleware;
