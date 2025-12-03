import {User} from "@/app/lib/types";

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    authenticated: boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}