Task :

##User Authentication

- Implement user authentication using JWT (JSON Web Tokens)
  for secure authentication.
- Create a registration page with input validation, password
  hashing, and error handling.
- Develop a login page with proper authentication checks and
  session management.

##What exactly is JWT? No better way to explain it than direct from the JWT website:

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

Arguably one of the largest use cases for JWT is authorization. We can generate a JWT token in the backend that is specific to a user, pass this JWT token to the frontend, and then our frontend can send this token alongside requests to access protected API routes.

Note : Need to update JWT after certain amount of time

JWT tokens can be given an expiration time. They can also be generated with no expiration, however I believe it’s best practice to make sure your tokens have an expiration and renew at certain intervals. This will mitigate the threat of one single token being stolen and used to access routes over-and-over again.

A hacker could also intercept network traffic between server and client to get the JWT token (much like they would with cookies). This can be prevented by always sending the token back and forth over HTTPS. It is mandatory that HTTPS should be used with JWT.

## Why we need mongoose model folder :

The mongoose.model function creates a model based on the schema, and we export it for use in other parts of the application.

By separating the model definition, you promote code organization and maintainability. It allows you to easily reuse the User model in different parts of your application, such as in routes, middleware, or other modules that interact with the user data.
