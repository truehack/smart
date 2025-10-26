import { useState, useEffect, ReactNode, JSX, useCallback } from 'react';
import {
    Dimensions,
    ViewProps,
    StyleSheet,
    View,
    ViewStyle,
    StyleProp,
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

export type UseModalProps = {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export type ModalViewProps = AnimatedProps<ViewProps> & {
    children?: ReactNode;
    title?: string;
    mode?: 'sheet' | 'fullscreen';
    showHeader?: boolean;
    contentStyle?: StyleProp<ViewStyle>;
    onClose?: () => void;
};

export type Modal = {
    open: () => void;
    close: () => void;
    visible: boolean;
    view: (props: ModalViewProps) => JSX.Element | null;
};

export function useModal({ visible, setVisible }: UseModalProps): Modal {
    const [onClose, setOnClose] = useState<() => void>();

    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const offset = useSharedValue(screenHeight);

    const duration = 250;

    const open = () => setVisible(true);
    const close = () => {
        offset.value = withTiming(screenHeight, {
            duration,
            easing: Easing.out(Easing.inOut(Easing.ease)),
        });
        setTimeout(() => setVisible(false), duration);
    };

    const closeByButton = () => {
        close();
        setTimeout(() => {
            onClose?.();
        }, duration);
    };

    useEffect(() => {
        if (visible) {
            offset.value = withTiming(0, {
                duration,
                easing: Easing.out(Easing.ease),
            });
        }
    }, [visible, offset]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    const ViewComponent = useCallback(
        (props: ModalViewProps) => {
            const {
                children,
                mode = 'sheet',
                title,
                showHeader = true,
                onClose: localOnClose,
            } = props;

            useEffect(() => {
                setOnClose(() => localOnClose);
            }, [localOnClose]);

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
                                borderWidth:
                                    mode === 'fullscreen'
                                        ? undefined
                                        : StyleSheet.hairlineWidth,
                                top: mode === 'fullscreen' ? 0 : undefined,
                                paddingTop:
                                    mode === 'fullscreen' && !showHeader
                                        ? insets.top + 12
                                        : 0,
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
                                    paddingTop:
                                        mode === 'fullscreen'
                                            ? insets.top + 12
                                            : 12,
                                    paddingBottom: 12,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            >
                                <Text
                                    variant="titleLarge"
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{
                                        flex: 1,
                                        marginRight: 8,
                                    }}
                                >
                                    {title}
                                </Text>

                                <IconButton
                                    icon="close"
                                    size={22}
                                    onPress={closeByButton}
                                />
                            </View>
                        )}

                        <View
                            style={[
                                { flex: 1, padding: 20 },
                                props.contentStyle,
                            ]}
                        >
                            {children}
                        </View>
                    </Animated.View>
                </Portal>
            );
        },
        [visible, offset, insets, theme, screenWidth, screenHeight],
    );

    return { open, close: closeByButton, visible, view: ViewComponent };
}
