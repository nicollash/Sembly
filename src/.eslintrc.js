module.exports = {
    "globals": {
        "fetch": false
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "indent": ["error", 2]
    },
    
};