import { useState, useEffect, ReactNode, JSX } from 'react';
import {
    Dimensions,
    ViewProps,
    StyleSheet,
    Pressable,
    View,
} from 'react-native';
import { Portal, useTheme, Text, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    AnimatedProps,
} from 'react-native-reanimated';

export type ModalViewProps = AnimatedProps<ViewProps> & {
    children?: ReactNode;
    title?: string;
    mode?: 'sheet' | 'fullscreen';
    showHeader?: boolean;
};

export type Modal = {
    open: () => void;
    close: () => void;
    visible: boolean;
    view: (props: ModalViewProps) => JSX.Element | null;
};

export function useModal(): Modal {
    const [visible, setVisible] = useState(false);
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const offset = useSharedValue(screenHeight);

    const open = () => setVisible(true);
    const close = () => {
        offset.value = withTiming(screenHeight, {
            duration: 250,
            easing: Easing.out(Easing.inOut(Easing.ease)),
        });
        setTimeout(() => setVisible(false), 250);
    };

    useEffect(() => {
        if (visible) {
            offset.value = withTiming(0, {
                duration: 250,
                easing: Easing.out(Easing.ease),
            });
        }
    }, [visible, offset]);

    const ViewComponent = (props: ModalViewProps) => {
        const { children, mode = 'sheet', title, showHeader = true } = props;

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: offset.value }],
        }));

        if (!visible) return null;

        return (
            <Portal>
                <Animated.View
                    {...props}
                    style={[
                        {
                            position: 'absolute', 
                            backgroundColor: theme.colors.background,
                            paddingBottom: insets.bottom + 16,
                            borderTopLeftRadius: mode === 'sheet' ? 24 : 0,
                            borderTopRightRadius: mode === 'sheet' ? 24 : 0,
                            outlineColor: theme.colors.outlineVariant,
                            outlineWidth: StyleSheet.hairlineWidth + 0.2,
                            top: mode === 'fullscreen' ? 0 : undefined,
                            paddingTop: (mode === "fullscreen" && !showHeader ? insets.top + 12 : 0),
                            bottom: 0,
                            width: screenWidth + 1,
                            height:
                                mode === 'fullscreen'
                                    ? '100%'
                                    : Math.min(screenHeight * 0.8, 600),
                        },
                        ...(Array.isArray(props.style)
                            ? props.style
                            : props.style
                                ? [props.style]
                                : []),
                        animatedStyle,
                    ]}
                >
                    {showHeader && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                paddingTop: (mode === 'fullscreen' ? insets.top + 12 : 12),
                                paddingBottom: 12,
                                borderBottomWidth: StyleSheet.hairlineWidth + 0.2,
                                borderColor: theme.colors.outlineVariant,
                            }}
                        >
                            <Text variant="titleLarge">{title}</Text>
                            <IconButton
                                icon="close"
                                size={22}
                                onPress={close}
                            />
                        </View>
                    )}

                    <View style={{ flex: 1, padding: 20 }}>{children}</View>
                </Animated.View>
            </Portal>
        );
    };

    return { open, close, visible, view: ViewComponent };
}
