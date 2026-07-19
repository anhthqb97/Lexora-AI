export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { connectDatabase } = await import("./lib/db/mongoose");
    await connectDatabase();
  }
}
