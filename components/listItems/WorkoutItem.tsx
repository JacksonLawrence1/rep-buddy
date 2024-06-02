import ListItem from './ListItem';

import { colors }from '@/constants/colors';
import { Workout } from '@/constants/types';

interface WorkoutBaseProps extends Workout {
  onPress?: () => void;
}

export default function WorkoutBase({ name, onPress }: WorkoutBaseProps) {
  const icon: string = 'ellipsis-h';

  return <ListItem label={name} onPress={onPress} backgroundColor={colors.primary} icon={icon} />;
}
