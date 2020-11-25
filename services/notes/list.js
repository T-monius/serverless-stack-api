import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import getCollaborators from "./libs/collaborators-lib.js";

const listForUser = async (userId) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": ,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
};

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const collaborators = getCollaborators(userId);
  const items = listForUser(userId);

  await collaborators;
  await items;

  const allItems = collaborators.reduce( async (items, collaboratorId) => {
    const collaboratorsItems = await listForUser(collaboratorId);
    return items.concat(collaboratorsItems);
  }, items);

  return allItems;
});