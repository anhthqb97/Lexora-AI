/**
 * MongoDB index migration script — P1-T091
 * Run: npm run db:create-indexes
 */
import { connectDatabase } from "../lib/db/mongoose";
import { User } from "../lib/modules/auth/models";
import { UserProfile } from "../lib/modules/user/models";

const MODELS = [User, UserProfile];

async function createIndexes() {
  await connectDatabase();
  console.info("Creating MongoDB indexes...");

  for (const model of MODELS) {
    const result = await model.syncIndexes();
    console.info(`  ${model.modelName}:`, result);
  }

  console.info("Done.");
  process.exit(0);
}

createIndexes().catch((err) => {
  console.error("Index creation failed:", err);
  process.exit(1);
});
