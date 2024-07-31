import { usePersistedStore } from "@/stores";
import { Redirect } from "expo-router";

const HomePage = () => {
    const user = usePersistedStore((state) => state.user);
    return <Redirect href={user ? "/home/" : "/onboarding/"} />;
}

export default HomePage;