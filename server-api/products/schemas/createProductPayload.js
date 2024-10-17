const { productPriceUnits }  = require("../../config");

module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    image: {
      type: "string",
    },
    price: {
      type: "number",
    },
    priceUnit: {
      type: "string",
      enum: Object.values(productPriceUnits),
    },
    categoryIds: {
      type: "array",
      items: {
        type: "number",
      },
    }
  },
  required: ["name", "description", "image", "price", "categoryIds"],
  additionalProperties: false,
};
