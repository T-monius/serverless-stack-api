import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const newCollaboratorEmail = data.email;
  const collaborators = []
  // TODO: get existing collaborators
  //   Retrieve userId of new collaborator by email
  //   Add userId of new collaborator to existing collaborators
  const params = {
    TableName: process.env.collaboratorsTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      collaborators: collaborators,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});