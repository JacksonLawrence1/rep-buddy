import { FontAwesome5 } from '@expo/vector-icons';

export interface icon {
    name: keyof typeof FontAwesome5.glyphMap;
    onPress?: () => void;
}
