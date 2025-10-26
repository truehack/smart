import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import {
    initialWindowMetrics,
    SafeAreaProvider,
} from 'react-native-safe-area-context';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </SafeAreaProvider>
        </PaperProvider>
    );
}




