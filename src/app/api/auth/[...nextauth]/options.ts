import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { connect } from '@/config/dbConfig';
import { User } from '@/models/userModel';
import { Doctor } from '@/models/doctorModel';
import { Admin } from '@/models/adminModel';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign-in form (e.g., "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign-in page.
            // You can specify which fields should be submitted by adding keys to the `credentials` object.
            // e.g., domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Connect to the database
                await connect();
                try {
                    // Check if user exists in any of the user data models
                    const user = await User.findOne({ username: credentials?.username }) ||
                        await Doctor.findOne({ username: credentials?.username }) ||
                        await Admin.findOne({ username: credentials?.username });
                    
                    if (!user) {
                        // Throw an error if the user does not exist
                        throw new Error("User does not exist, please check your username");
                    }

                    // Check if the password is correct
                    const validPassword = await bcrypt.compare(credentials?.password!, user.password);
                    if (!validPassword) {
                        // Throw an error if the password is invalid
                        throw new Error("Invalid password");
                    }
                    
                    // Return the user object if authentication is successful
                    return user;

                } catch (err: any) {
                    throw new Error(err);
                }
            }
        })
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
    secret: process.env.NEXTAUTH_SECRET
}
