// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from "@prisma/extension-accelerate";
import { withOptimize } from "@prisma/extension-optimize";


// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const prismaClientSingleton = () => {
  return new PrismaClient()
  .$extends(
    withOptimize({
      apiKey: 'process.env.OPTIMIZE_API_KEY',
    })
  )
.$extends(withAccelerate());

}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;


const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()


export const prismadb = prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
