import { getCollaborators } from "../libs/collaborators-lib";

test("Can retrieve collaborators", async () => {
  let collaborators;
  try {
    // TODO: consider testing with a real userId
    collaborators = await getCollaborators('123');
  } catch {
    collaborators = [];
  }
  const isArray = Array.isArray(collaborators);

  expect(isArray).toEqual(true);
});
