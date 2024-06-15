import { db } from "../src/db/client";
import { users } from "../src/db/schema";

const result = await db.select().from(users);
console.log(result)