import handler from "./libs/handler-lib";

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoIdentityId;
  // TODO: hash the userId
  const userIdForSharing = userId;

  return userIdForSharing;
});