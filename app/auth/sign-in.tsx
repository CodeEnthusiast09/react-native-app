import { useSignIn } from "@/hooks/services";
import { signInValidationSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { InferType } from "yup";
import { styles } from "../../styles/auth-styles";

export default function SignInScreen() {
  const { mutate: signIn, isPending: isSubmitting } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInValidationSchema) });

  const handleLogin: SubmitHandler<InferType<typeof signInValidationSchema>> = (
    data
  ) => signIn({ data });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          Welcome Back
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="example@gmail.com"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.email}
              />
              <HelperText type="error" visible={!!errors.email}>
                {errors.email?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
              />
              <HelperText type="error" visible={!!errors.password}>
                {errors.password?.message}
              </HelperText>
            </>
          )}
        />

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(handleLogin)}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign in
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <Text>Don&apos;t have an account? </Text>
          <Link href="/auth/sign-up" style={{ color: "#6200ee" }}>
            Sign up
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
