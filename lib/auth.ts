import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { verifyPassword } from "@/lib/modules/auth/service";
import { connectDatabase } from "@/lib/db/mongoose";
import { User } from "@/lib/modules/auth/models";

const providers: NextAuthConfig["providers"] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const email = credentials?.email as string | undefined;
      const password = credentials?.password as string | undefined;
      if (!email || !password) return null;

      const user = await verifyPassword(email, password);
      if (!user) return null;

      return {
        id: user._id.toString(),
        email: user.email,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

/** Facebook OAuth stub — registered when env vars are present. */
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (!account || account.provider === "credentials") return true;

      const email = user.email?.toLowerCase().trim();
      if (!email) return false;

      await connectDatabase();

      const provider = account.provider as "google" | "facebook";
      let existing = await User.findOne({
        oauthProvider: provider,
        oauthId: account.providerAccountId,
        status: "active",
      });

      if (!existing) {
        existing = await User.findOne({ email, status: "active" });
        if (existing) {
          existing.oauthProvider = provider;
          existing.oauthId = account.providerAccountId;
          await existing.save();
        } else {
          existing = await User.create({
            email,
            oauthProvider: provider,
            oauthId: account.providerAccountId,
            tier: "free",
            status: "active",
          });
        }
      }

      user.id = existing._id.toString();
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
