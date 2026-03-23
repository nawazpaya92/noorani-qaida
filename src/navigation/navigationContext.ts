import { useContext } from "react";
import { NavigationContext } from "./Router";

export const useNavigation = () => {
    const ctx = useContext(NavigationContext);
    if (!ctx) {
        throw new Error("useNavigation must be used inside NavigationProvider");
    }
    return ctx;
};