import dynamoDb from "./dynamodb-lib";

const getCollaboratorsItem = async (userId) => {
  const params = {
    TableName: process.env.collaboratorsTableName,
    Key: {
      userId: userId,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
};

export getCollaboratorsItem;