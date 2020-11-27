import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { getCollaboratorsItem } from "./libs/collaborators-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const newCollaboratorId = data.collaboratorId;
  const userId = event.requestContext.identity.cognitoIdentityId;
  let collaborators;

  try {
    const collaboratorsItem = await getCollaboratorsItem(userId);
    collaborators = collaboratorsItem.collaborators;
  } catch {
    collaborators = [];
  }

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

  // TODO: consider whether to return anything at all or boolean
  return params.Item;
});