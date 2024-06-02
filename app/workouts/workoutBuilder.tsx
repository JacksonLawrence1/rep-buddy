import DefaultPage from "@/components/pages/DefaultPage";
import WorkoutBuilderForm from "@/components/forms/WorkoutBuilderForm";

export default function WorkoutBuilder() {

  return (
    <DefaultPage title="New Workout" back>
      <WorkoutBuilderForm />
    </DefaultPage>
  );
}
