import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import getCollaborators from "./libs/collaborators-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const newCollaboratorId = data.collaboratorId;
  const userId = event.requestContext.identity.cognitoIdentityId;
  const collaborators = await getCollaborators(userId);
  collaborators.push(newCollaboratorId);

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