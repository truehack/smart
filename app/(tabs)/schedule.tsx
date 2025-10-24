import { ScreenView } from '@/components/screen-view';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
    return (
        <ScreenView style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Расписание</Text>
        </ScreenView>
    );
}
