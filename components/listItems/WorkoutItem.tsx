import ListItem from './ListItem';

import { Colors }from '@/constants/Colors';
import { Icon } from '@/constants/Icon';

interface WorkoutBaseProps {
  workoutName: string;
}

export default function WorkoutBase({ workoutName }: WorkoutBaseProps) {
  // TODO: add icon onPress functions
  const icons: Icon[] = [
    { name: 'ellipsis-h' },
  ];

  return <ListItem label={workoutName} backgroundColor={Colors.primary} icons={icons} />;
}
