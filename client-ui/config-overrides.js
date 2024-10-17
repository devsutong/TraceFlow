// config-overrides.js
module.exports = function override(config, env) {
    // Ignore warnings for popper.js source maps
    config.ignoreWarnings = [
      {
        module: /popper\.js/,
        message: /Failed to parse source map/,
      },
    ];
  
    return config;
  };
  