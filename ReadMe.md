# An authentication api to be used internally for personal projects.

## NPM Scripts:

- "start": "cd dist && node index.js",
- "dev": "cd src && nodemon index.ts",
- "build": "tsc --build",

Routes

- / - Landing
- /api/login - Login, accepted post params are: email, password
- /api/register - Register, accepted post params are: email, password, firstName, lastName, {metadata}
- /api/reset - Reset password, accepted post params are: email, password. **NOTE** Auth token is needed.
