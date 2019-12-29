module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  plugins: ['@typescript-eslint'],
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  rules:  {
    'quotes': ['warn', 'single'],
    '@typescript-eslint/indent' : ['error', 2],
    '@typescript-eslint/no-use-before-define' : 'off',
    '@typescript-eslint/no-explicit-any' : 'off',
    'semi' : 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-empty-function': 'off',
    'object-property-newline': ["error", { "allowAllPropertiesOnSameLine": true }],
    'object-curly-spacing':['warn', 'always']
  },
};