const { roles } = require('../../config')

module.export = {
    type: 'object',
    properties: {
        username: {
            type: 'string'
        },
        email: {
            type: 'string',
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        },
        password: {
            type: 'string'
        },
        age: {
            type: 'number'
        },
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        role: {
            type: 'string',
            enum: Object.values(roles)
        },
        gstin: { // TODO: Add validation for GSTIN (Required if seller)
            type: 'string',
            pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$"
        },

        required: [
            'username',
            'email',
            'password',
            'age',
            'firstName',
            'lastName',
        ], 
        additionalProperties: false
    }
}