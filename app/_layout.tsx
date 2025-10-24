import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useTheme } from '@/hooks/use-theme';

export default function Layout() {
    const { theme } = useTheme();

    return (
        <PaperProvider theme={theme}>
            <Stack screenOptions={{ headerShown: false }} />
        </PaperProvider>
    );
}
