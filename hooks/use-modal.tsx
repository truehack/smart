import { useState, ReactNode, useEffect } from 'react';
import { StyleSheet, Dimensions, ViewProps } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    AnimatedProps,
} from 'react-native-reanimated';

export type Modal = {
    open: () => void;
    close: () => void;
    view: ({
        children,
    }: {
        children: React.ReactNode;
    }) => React.JSX.Element | null;
    visible: boolean;
};

export type UseModalProps = {
    viewProps?: AnimatedProps<ViewProps>
}

export function useModal(props?: UseModalProps): Modal {
    const [visible, setVisible] = useState(false);

    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const offset = useSharedValue(screenHeight);

    const open = () => setVisible(true);
    const close = () => {
        offset.value = withTiming(screenHeight, {
            duration: 300,
            easing: Easing.out(Easing.inOut(Easing.ease)),
        });
        setTimeout(() => setVisible(false), 300);
    };

    useEffect(() => {
        if (visible) {
            offset.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.ease),
            });
        }
    }, [visible, offset]);

    const View = ({ children }: { children: ReactNode }) => {
        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: offset.value }],
        }));

        if (!visible) return null;

        return (
            <Portal>
                <Animated.View
                    {...props?.viewProps}
                    style={[
                        {
                            backgroundColor: theme.colors.outlineVariant,
                            paddingTop: insets.top,
                            paddingBottom: insets.bottom,
                            paddingLeft: insets.left + 20,
                            paddingRight: insets.right + 20,
                        },
                        ...(Array.isArray(props?.viewProps?.style)
                            ? props.viewProps.style
                            : props?.viewProps?.style
                                ? [props.viewProps.style]
                                : []),
                        {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: '100%',
                        },
                        animatedStyle,
                    ]}
                >
                    {children}
                </Animated.View>
            </Portal>
        );
    };

    return { open, close, view: View, visible };
} 
