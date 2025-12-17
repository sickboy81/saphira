import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes (Visits are cached for 5 mins)
            gcTime: 1000 * 60 * 30, // 30 minutes (Garbage collection)
            retry: 1,
            refetchOnWindowFocus: false, // Don't refetch just because user clicked back to tab
            refetchOnReconnect: true,     // Do refetch if internet comes back
        },
    },
});
