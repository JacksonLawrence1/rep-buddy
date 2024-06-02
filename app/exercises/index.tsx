import LinkButton from "@/components/buttons/LinkButton";
import ExerciseItem from "@/components/listItems/ExerciseItem";
import PageItemList from "@/components/pages/PageItemList";

import exerciseService from "@/constants/storage/exercises";
const service: string = "exercisesPage";

export default function Index() {
  function FooterComponent(): React.ReactNode {
    return <LinkButton href="/exercises/addExercise" theme="primary" label="Add Exercise" icon={"plus"} />
  }

  return <PageItemList
    callerId={service}
    title="Your Exercises"
    searchPlaceholder="Search for Exercise"
    service={exerciseService}
    ListComponent={ExerciseItem}
    FooterComponent={FooterComponent()}
    seperatorHeight={4}
  />;
}
