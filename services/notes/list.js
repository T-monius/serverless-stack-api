import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import getCollaboratorsItem from "./libs/collaborators-lib.js";

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
      ":userId": userId,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
};

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const itemsPromise = listForUser(userId);
  let collaborators;

  try {
    // const params = {
    //   TableName: process.env.collaboratorsTableName,
    //   Key: {
    //     userId: userId,
    //   },
    // };

    // const result = await dynamoDb.get(params);
    // if (!result.Item) {
    //   throw new Error("Item not found.");
    // }

    // collaborators = result.Item.collaborators;

    console.log("getCollaboratorsItem function: ", getCollaboratorsItem);
    const item = await getCollaboratorsItem(userId);
    console.log("item from getCollaboratorsItem: ", item);
    collaborators = item.collaborators;
  } catch {
    collaborators = [];
  }

  items = await itemsPromise;

  const allItems = collaborators.reduce( async (items, collaboratorId) => {
    const collaboratorsItems = await listForUser(collaboratorId);
    console.log("Items to be concatenated: ", collaboratorsItems);
    return items.concat(collaboratorsItems);
  }, items);

  return allItems;

  // const params = {
  //   TableName: process.env.tableName,
  //   // 'KeyConditionExpression' defines the condition for the query
  //   // - 'userId = :userId': only return items with matching 'userId'
  //   //   partition key
  //   KeyConditionExpression: "userId = :userId",
  //   // 'ExpressionAttributeValues' defines the value in the condition
  //   // - ':userId': defines 'userId' to be the id of the author
  //   ExpressionAttributeValues: {
  //     ":userId": event.requestContext.identity.cognitoIdentityId,
  //   },
  // };

  // const result = await dynamoDb.query(params);

  // // Return the matching list of items in response body
  // return result.Items;
});