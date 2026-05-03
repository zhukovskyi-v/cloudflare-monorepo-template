import {createORPCClient} from "@orpc/client";
import {RPCLink} from "@orpc/client/fetch";
import {createTanstackQueryUtils} from "@orpc/tanstack-query";
import {QueryCache, QueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import type {ContractRouterClient} from "@orpc/contract";
import {appContract} from "@repo/contracts";

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            toast.error(`Error: ${error.message}`, {
                action: {
                    label: "retry",
                    onClick: () => {
                        queryClient.invalidateQueries();
                    },
                },
            });
        },
    }),
});

export const link = new RPCLink({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/rpc`,
    fetch(url, options) {
        return fetch(url, {
            ...options,
            credentials: "include",
        });
    },
    headers: async () => {
        return {
            // attach real credentials parsing here
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
        };
    },
});

const client: ContractRouterClient<typeof appContract> = createORPCClient(link)

export const orpc = createTanstackQueryUtils(client);
