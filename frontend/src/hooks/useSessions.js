import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

export const useCreateSession = () => {
    const result = useMutation({
        mutationKey: ["createSession"],
        mutationFn: sessionApi.createSession,
        onSuccess: () => toast.success("Room created successfully"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to create room"),
    });
    return result;
};

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ["activeSessions"],
        queryFn: sessionApi.getActiveSessions,
    });
    return result;
};

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["MyRecentSessions"],
        queryFn: sessionApi.getMyRecentSessions,
    });
    return result;
};

export const useSessionById = (id) => {
    const result = useQuery({
        queryKey: ["session", id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,   //  ? this will return a boolean based on (id) present or not
        refetchInterval: 5000, //  ? this will refetch the session by id every 5 seconds, (detech changes)
    });
    return result;
};

export const useJoinSession = (id) => {
    const result = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: () => sessionApi.joinSession(id),
        onSuccess: () => toast.success("room joined"),
        onError: (error) => toast.error(error.response?.data?.message || "could not enter room"),
    });

    return result;
};
export const useEndSession = (id) => {
    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: () => sessionApi.endSession(id),
        onSuccess: () => toast.success("room ended"),
        onError: (error) => toast.error(error.response?.data?.message || "could not end room"),
    });

    return result;
};

