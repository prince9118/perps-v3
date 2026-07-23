import { redis } from "@repo/redis";

async function main() {
  //   console.log("Engine Started");
  while (true) {
    const result = await redis.xread(
      "BLOCK",
      0,
      "STREAMS",
      "order_events",
      "$"
    );
    if (!result) continue;
    console.log(result);
  }
}
main();
