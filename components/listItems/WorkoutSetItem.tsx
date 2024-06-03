import { View, StyleSheet } from 'react-native';

import { colors }from '@/constants/colors';
import { WorkoutSet } from '@/constants/types';
import ListItem from './ListItem';

interface WorkoutBaseProps extends WorkoutSet {
  onPress?: () => void;
}

export default function WorkoutBase({ exercise, sets, onPress }: WorkoutBaseProps) {
  return (
    <View style={styles.workoutContainer}>
      <ListItem label={exercise.name} onPress={onPress} backgroundColor={colors.tertiary} />
      <View style={{flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
        <ListItem label={`Minimum Sets: ${sets}`} onPress={onPress} backgroundColor={colors.inputBackground} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  workoutContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    marginBottom: 8,
  },
  workoutIcon: {
    color: colors.text,
  },
});
