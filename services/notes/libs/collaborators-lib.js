import dynamoDb from "./dynamodb-lib";

const getCollaborators = async (currentUserId) => {
  const params = {
    // Potential bug: is process.env available in libs directory?
    TableName: process.env.collaboratorsTableName,
    Key: {
      userId: currentUserId,
    },
  };

  const result = await dynamoDb.get(params);

  return result.Item.collaborators || [];
};

export { getCollaborators };