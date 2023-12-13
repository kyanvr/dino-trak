import { Tabs } from "expo-router";

export default function _layout() {

    return (
        <Tabs>
            <Tabs.Screen name="startup/start" options={{ href: null }} />
        </Tabs>
    )
}
