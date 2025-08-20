import { Input } from "@/components/input";
import { RadioInput } from "@/components/input/radio-input";
import { useCreateHabit } from "@/hooks/services";
import { FREQUENCIES } from "@/lib/constants";
import { addHabitStyles } from "@/styles/add-habit-styles";
import { habitValidationSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { InferType } from "yup";

export default function AddhabitScreen() {
  const { mutate: createHabit, isPending: isSubmitting } = useCreateHabit();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(habitValidationSchema),
    defaultValues: { streak: 0 },
  });

  const handleCreateHabit: SubmitHandler<
    InferType<typeof habitValidationSchema>
  > = (data) => createHabit({ data });

  const title = watch("title");
  const description = watch("description");

  return (
    <View style={addHabitStyles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              label="Title"
              labelStyle={{ fontSize: 16 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              showRequiredAsterik
              error={errors.title}
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              label="Description"
              labelStyle={{ fontSize: 16 }}
              showRequiredAsterik
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.description}
            />
          </>
        )}
      />

      <RadioInput
        label="Frequency"
        labelStyle={{ fontSize: 16 }}
        wrapperStyle={{ marginBottom: 24 }}
        name="frequency"
        control={control}
        options={FREQUENCIES}
        showRequiredAsterik
        error={errors.frequency}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(handleCreateHabit)}
        loading={isSubmitting}
        disabled={!title || !description || isSubmitting}
        style={addHabitStyles.button}
        labelStyle={addHabitStyles.buttonLabel}
      >
        Create Habit
      </Button>
    </View>
  );
}
