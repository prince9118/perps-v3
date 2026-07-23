import { redis } from "@repo/redis";

async function main() {
  while (true) {
    const result = await redis.xread(
      "BLOCK",
      0,
      "STREAMS",
      "order_events",
      "$"
    );
    console.log(result);
  }
}
main();
