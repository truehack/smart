import { useState, useEffect } from 'react';
import { Dimensions, ViewProps } from 'react-native';
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
    visible: boolean;
    view: (
        props: AnimatedProps<ViewProps>
    ) => React.JSX.Element | null;
};

export function useModal(): Modal {
    const [visible, setVisible] = useState(false);

    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
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

    const View = (props: AnimatedProps<ViewProps>) => {
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
                            backgroundColor: theme.colors.background,
                            paddingTop: insets.top + 20,
                            paddingBottom: insets.bottom + 20,
                            paddingLeft: insets.left + 20,
                            paddingRight: insets.right + 20,
                        },
                        ...(Array.isArray(props.style)
                            ? props.style
                            : props.style
                                ? [props.style]
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
                    {props.children}
                </Animated.View>
            </Portal>
        );
    };

    return { open, close, view: View, visible };
}
