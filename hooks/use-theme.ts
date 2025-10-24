import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const useTheme = () => {
    const colorScheme = useColorScheme();

    return colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
};
