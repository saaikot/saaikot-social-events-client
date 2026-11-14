import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";

let dbInstance;
let clientInstance;

const getMongoDB = async () => {
  if (!dbInstance) {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    clientInstance = mongoose.connection.getClient();
    dbInstance = clientInstance.db();
  }
  return { db: dbInstance, client: clientInstance };
};

const { db, client } = await getMongoDB();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    collectionNames: {
      user: "users",
      session: "sessions",
      account: "accounts",
    },
  }),
  emailAndPassword: {
    enabled: true, 
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, 
  },
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: ["http://localhost:3001"],
  plugins: [
    jwt(),
    nextCookies()
  ],
});