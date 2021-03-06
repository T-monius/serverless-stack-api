import handler from "./libs/handler-lib";
import * as Pusher from "pusher";

export const main = handler(async (event, context) => {
  // const data = JSON.parse(event.body);
  // const userId = event.Records[0].dynamodb.Keys.userId.S;
  const pusher = new Pusher({
    appId: "1114436",
    key: "71006dcae7db25deafa6",
    secret: "1335d49a4dff871c76fa",
    cluster: "us2",
    useTLS: true
  });

  const result = await pusher.trigger("my-channel", "my-event", {
    message: "'notePusher' lambda!"
  });

  console.log("result of pusher.trigger: ", result);
});