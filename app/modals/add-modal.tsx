import { ScreenView } from '@/components/screen-view';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';

export default function CreateModal() {
    const router = useRouter();

    return (
        <ScreenView hasHeader style={{ padding: 16 }}>
            <Button mode="contained" onPress={router.back}>
                Вернуться
            </Button>
        </ScreenView>
    );
}
