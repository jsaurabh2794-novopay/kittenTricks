import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { EmailIcon } from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";

export default ({ navigation }): React.ReactElement => {
  const [email, setEmail] = React.useState<string>();

  const onResetPasswordButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  return (
    <KeyboardAvoidingView>
      <Text style={styles.forgotPasswordLabel} category="h4" status="control">
        Forgot Password
      </Text>
      <Text style={styles.enterEmailLabel} status="control">
        Please enter your email address
      </Text>
      <View style={styles.formContainer}>
        <Input
          placeholder="admin@novopay.in"
          accessoryRight={EmailIcon}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Button size="giant" onPress={onResetPasswordButtonPress}>
        RESET PASSWORD
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal:10
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 24,
    color:"black"
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 64,
    color:"black"
  },
});
