import { redis } from "@repo/redis";
function parseRedisFields(fields: string[]) {
  const obj: Record<string, string> = {};

  for (let i = 0; i < fields.length; i += 2) {
    const key = fields[i]!;
    const value = fields[i + 1]!;

    obj[key] = value;
  }
  return obj;
}

async function main() {
  console.log("Engine Started");
  while (true) {
    const result = await redis.xread(
      "BLOCK",
      0,
      "STREAMS",
      "order_events",
      "$"
    );
    if (!result) continue;
    const [streamName, messages] = result[0];
    for (const [messageId, fields] of messages) {
      const parsedFields = parseRedisFields(fields);
      const event = {
        type: parsedFields.type,
        data: JSON.parse(parsedFields.data)
      };
      lastId=messageId;
    }
  }
}
main();
