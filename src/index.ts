import { Context, Schema } from "koishi";

export const name = "lastqa";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx
    .command("choice <o1> <o2>")
    .shortcut(/!(.+)还是(.+)/, { args: ["$1", "$2"] })
    .shortcut(/！(.+)还是(.+)/, { args: ["$1", "$2"] })
    .action(async ({ session, options }, o1, o2) => {
      let i1 = o1.replace(/我/g, "你");
      let i2 = o2.replace(/我/g, "你");
      session.send("当然是" + random(i1, i2) + "咯~");
    });

  ctx
    .command("decide <o1> <o2>")
    .shortcut(/!(.+)不(.+)/, { args: ["$1", "$2"] })
    .shortcut(/！(.+)不(.+)/, { args: ["$1", "$2"] })
    .action(async ({ session, options }, o1, o2) => {
      if (o1 == o2[0]) {
        let i2 = o2.replace(/我/g, "你");
        session.send(random(i2, "不" + i2));
      }
    });
}

function random(o1: string, o2: string): string {
  const randomValue = Math.random();
  return randomValue < 0.5 ? o1 : o2;
}
