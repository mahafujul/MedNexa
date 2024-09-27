import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import  type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import prisma from '@/lib/prisma';


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Please enter your username and password");
                }

                // Check if the user exists in any of the tables (User, Doctor, Admin)
                const user = await prisma.user.findUnique({ where: { username: credentials.username } }) ||
                             await prisma.doctor.findUnique({ where: { username: credentials.username } }) ||
                             await prisma.admin.findUnique({ where: { username: credentials.username } });

                if (!user) {
                    // Throw an error if the user does not exist
                    throw new Error("User does not exist, please check your username");
                }

                // Validate password
                const validPassword = await bcrypt.compare(credentials.password, user.password);
                if (!validPassword) {
                    // Throw an error if the password is invalid
                    throw new Error("Invalid password");
                }

                // Return user object if authentication succeeds
                return { id: user.id, username: user.username, role: user.role };
            }
        })
    ],

        EmailProvider({
            server: {
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT),
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
              },
            },
            from: process.env.SMTP_FROM,
          }),
    ],


    callbacks: {
        async session({ session, token }) {
            // Attach additional user information to the session object
            if (token) {
                session.user.username = token?.username?.toString();
                session.user.userId = token?.userId?.toString();
                session.user.role = token?.role?.toString();
            }
            return session;
        },
        async jwt({ token, user }) {
            // Attach additional user information to the token object
            if (user) {
                token.username = user?.username?.toString();
                token.userId = user._id?.toString();
                token.role = user?.role?.toString();
            }
            return token;
        }
    },
    pages: {
        // Custom sign-in page
        signIn: '/login_signup'
    },
    session: {
        // Use JWT for session management
        strategy: "jwt"
    },
    // Secret used to sign the tokens
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,}
