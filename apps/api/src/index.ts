import {RPCHandler} from "@orpc/server/fetch";
import {Context, Hono} from 'hono'
import {logger} from "hono/logger";
import {cors} from "hono/cors";
import {dbMiddleware} from './middleware/database'
import type {AppEnv} from './types'
import {createContext} from "@/lib/context";
import {appRouter} from "./modules/app.router";


const app = new Hono<AppEnv>()

app.use(logger());

app.use('*', cors({
    origin: (origin, c: Context<AppEnv>) => {
        if (!origin) {
            return '*';
        }
        return c.env.ALLOWED_ORIGINS.split(',').includes(origin) ? origin : '';
    },
    allowMethods: ['GET', 'POST', 'OPTIONS', "PUT", "PATCH", "DELETE"],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600,
}));

app.use(dbMiddleware)

const handler = new RPCHandler(appRouter);

app.use("/rpc/*", async (c, next) => {
    const context = await createContext({context: c});

    const BODY_PARSER_METHODS = new Set(['arrayBuffer', 'blob', 'formData', 'json', 'text'] as const);
    type BodyParserMethod = typeof BODY_PARSER_METHODS extends Set<infer T> ? T : never;

    const request = new Proxy(c.req.raw, {
        get(target, prop) {
            if (BODY_PARSER_METHODS.has(prop as BodyParserMethod)) {
                return () => c.req[prop as BodyParserMethod]();
            }
            return Reflect.get(target, prop, target);
        }
    });

    const {matched, response} = await handler.handle(request, {
        prefix: "/rpc",
        context: context,
    });

    if (matched) {
        return c.newResponse(response.body, response);
    }

    await next();
});

export default app
