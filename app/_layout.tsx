import { useTheme } from '@/hooks/use-theme';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
    const theme = useTheme();

    return (
        <PaperProvider theme={theme}>
            
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerTintColor: theme.colors.onBackground,
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="modals/add-modal"
                    options={{
                        presentation: 'fullScreenModal',
                        animation: 'fade_from_bottom',
                        headerTitle: 'Добавить лекарство',
                    }}
                />
            </Stack>
        </PaperProvider>
    );
}
