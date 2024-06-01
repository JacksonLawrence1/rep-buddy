import ListItem from './ListItem';

import { colors }from '@/constants/colors';
import { icon } from '@/constants/icon';

interface WorkoutBaseProps {
  workoutName: string;
}

export default function WorkoutBase({ workoutName }: WorkoutBaseProps) {
  // TODO: add icon onPress functions
  const icons: icon[] = [
    { name: 'ellipsis-h' },
  ];

  return <ListItem label={workoutName} backgroundColor={colors.primary} icons={icons} />;
}
