import handler from "./libs/handler-lib";
import { listForUser } from "./libs/list-lib";
import { getCollaboratorsItem } from "./libs/collaborators-lib.js";

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const userListPromise = listForUser(userId);
  let collaborators;

  try {
    const item = await getCollaboratorsItem(userId);
    collaborators = item.collaborators;
  } catch {
    collaborators = [];
  }

  const userList = await userListPromise;

  const allItems = collaborators.reduce( async (list, collaboratorId) => {
    const collaboratorList = await listForUser(collaboratorId);
    return list.concat(collaboratorList);
  }, userList);

  return allItems;
});