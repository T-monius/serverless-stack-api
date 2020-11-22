import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import getCollaborators from "./libs/collaborators-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const newCollaboratorEmail = data.email;
  const userId = event.requestContext.identity.cognitoIdentityId;
  const collaborators = await getCollaborators(userId);
  // TODO: Retrieve userId of new collaborator by email
  //   Add userId of new collaborator to existing collaborators

  const params = {
    TableName: process.env.collaboratorsTableName,
    Item: {
      userId: userId,
      collaborators: collaborators,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});