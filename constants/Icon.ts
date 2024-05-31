import { FontAwesome5 } from '@expo/vector-icons';

export interface Icon {
    name: keyof typeof FontAwesome5.glyphMap;
    onPress?: () => void;
}
