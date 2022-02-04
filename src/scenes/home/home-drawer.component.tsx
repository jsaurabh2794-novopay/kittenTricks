import React, { ReactElement, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  DrawerElement,
  Layout,
  Text,
  IndexPath,
} from "@ui-kitten/components";
import {
  BookIcon,
  GithubIcon,
  LogoutIcon,
  PersonIcon,
} from "../../components/icons";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { WebBrowserService } from "../../services/web-browser.service";
import { AppInfoService } from "../../services/app-info.service";
import { useContext } from "react";
import AuthContext from "../../context/Auth-context";

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({ navigation }): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(null);
  const ctx = useContext(AuthContext);

  const DATA = [
    {
      title: "Profile Details",
      icon: PersonIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate("Profile");
      },
    },
    {
      title: "Logout",
      icon: LogoutIcon,
      onPress: () => {
        navigation.toggleDrawer();
        ctx.logoutHandler();
      },
    },
  ];

  const renderHeader = (): ReactElement => (
    <SafeAreaLayout insets="top" level="2">
      <Layout style={styles.header} level="2">
        <View style={styles.profileContainer}>
          <Avatar
            size="giant"
            source={require("../../assets/images/image-app-icon.png")}
          />
          <Text style={styles.profileName} category="h6">
            Medusa Store
          </Text>
        </View>
      </Layout>
    </SafeAreaLayout>
  );

  const renderFooter = () => (
    <SafeAreaLayout insets="bottom">
      <React.Fragment>
        <Divider />
        <View style={styles.footer}>
          <Text>{`Version 0.2`}</Text>
        </View>
      </React.Fragment>
    </SafeAreaLayout>
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      {DATA.map((el, index) => (
        <DrawerItem
          key={index}
          title={el.title}
          onPress={el.onPress}
          accessoryLeft={el.icon}
        />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 16,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
  },
});
