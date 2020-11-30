import handler from "./libs/handler-lib";
import * as Pusher from "pusher";

export const main = handler(async (event, context) => {
  // const data = JSON.parse(event.body);
  // const userId = event.Records[0].dynamodb.Keys.userId.S;
  console.log("Pusher: ", Pusher);
  const pusher = new Pusher({
    appId: "1114436",
    key: "71006dcae7db25deafa6",
    secret: "1335d49a4dff871c76fa",
    cluster: "us2",
    useTLS: true
  });

  console.log("pusher: ", pusher);
  const result = pusher.trigger("my-channel", "my-event", {
    message: "'notePusher' lambda!"
  }, (error, request, response) => {
    console.log("response in callback: ", response);
  });

  console.log("result of pusher.trigger: ", result);
});