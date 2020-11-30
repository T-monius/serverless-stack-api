import handler from "./libs/handler-lib";
import PubNub from "pubnub";

export const main = handler(async (event, context) => {
  // const data = JSON.parse(event.body);
  // const userId = event.Records[0].dynamodb.Keys.userId.S;
  const uuid = PubNub.generateUUID();
  const pubnub = new PubNub({
    publishKey:  "pub-c-36356392-3915-4557-a635-2d1f7c33924d",
    subscribeKey: "sub-c-940c7db4-3272-11eb-9d95-7ab25c099cb1",
    uuid: uuid
  });

  const publishConfig = {
    channel: "pubnub_onboarding_channel",
    message: {"sender": uuid, "content": "Hello From Node.js SDK"}
  };

  pubnub.subscribe({
    channels: ["pubnub_onboarding_channel"],
    withPresence: true,
  });

  pubnub.publish(publishConfig, function(status, response) {
    console.log(status, response);
  });
});