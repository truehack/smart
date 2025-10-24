import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ScreenViewProps = ViewProps & {
    hasHeader?: boolean;
};

export function ScreenView({ hasHeader, style, ...props }: ScreenViewProps) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View
            {...props}
            style={[
                {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    paddingTop: hasHeader ? 0 : insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
                style,
            ]}
        />
    );
}
