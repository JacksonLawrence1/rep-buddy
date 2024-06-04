import WorkoutItem from "@/components/listItems/WorkoutItem";
import PageItemList from "@/components/pages/PageItemList";
import LinkButton from "@/components/buttons/LinkButton";

import workoutService from "@/constants/storage/workouts";
const callerId: string = "workoutsPage";

export default function Workouts() {

  function FooterComponent() {
    return <LinkButton href="/workouts/workoutBuilder" label="Create New Workout" theme="primary" icon="plus" />;
  }

  return <PageItemList 
    callerId={callerId}
    title="Your Workouts"
    searchPlaceholder="Search for workout"
    backRoute="/"
    service={workoutService}
    ListComponent={WorkoutItem}
    FooterComponent={FooterComponent()}
    seperatorHeight={8}
  />;
}
