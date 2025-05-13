import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { mongooseConnection } from "@/lib/mongoconnection";
import Users from "@/models/Users";

declare module "next-auth" {
  interface Session {
    user?: {
      username?: string | null;
      email?: string | null;
      id?: string;
      accessToken?: string;
      provider?: string;
      role?: string;
      error?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    provider?: string;
    role?: string;
    error?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;

        await mongooseConnection();

        let user = await Users.findOne({ email: profile?.email });

        if (!user) {
          const adminUser = await Users.findOne({ role: "admin" });

          if (adminUser) {
            if (profile?.email !== adminUser.email) {
              throw new Error("Only the admin email can sign up.");
            }
          } else {
            user = await Users.create({
              username: profile?.name || "New User",
              email: profile?.email,
              role: "admin", 
              provider: account.provider, 

            });
          }
        }

        token.id = user._id.toString();
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (!token.id) {
        delete session.user; 
      } else {
        session.user = {
          id: token.id,
          accessToken: token.accessToken,
          provider: token.provider,
          role: token.role,
          error: token.error,
        };
      }

      return session;
    },
  },

  pages: {
    signIn: "/authentication/signin", 
    error: "/authentication/signin", 
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
