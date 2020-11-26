import dynamoDb from "./dynamodb-lib";

const getCollaboratorsItem = async (currentUserId) => {
  const params = {
    // Potential bug: is process.env available in libs directory?
    TableName: process.env.collaboratorsTableName,
    Key: {
      userId: currentUserId,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
};

export { getCollaboratorsItem };