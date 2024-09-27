import NextAuth from "next-auth/next";
import { authOptions } from "./options";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions)

export default handler