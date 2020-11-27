import dynamoDb from "./dynamodb-lib";

const getCollaboratorsItem = async (userId) => {
  // const params = {
  //   // Potential bug: is process.env available in libs directory?
  //   TableName: process.env.collaboratorsTableName,
  //   Key: {
  //     userId: userId,
  //   },
  // };

  // const result = await dynamoDb.get(params);
  // if (!result.Item) {
  //   throw new Error("Item not found.");
  // }

  // return result.Item;

  const params = {
    TableName: process.env.collaboratorsTableName,
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

export { getCollaboratorsItem };