import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';

export type ScreenViewProps = ViewProps & {
    hasHeader?: boolean;
};

export function ScreenView(props: ScreenViewProps) {
    const Container = !props.hasHeader ? SafeAreaView : View;
    const { theme } = useTheme();

    return (
        <Container
            {...props}
            style={[
                { flex: 1, backgroundColor: theme.colors.background },
                props.style,
            ]}
        />
    );
}
