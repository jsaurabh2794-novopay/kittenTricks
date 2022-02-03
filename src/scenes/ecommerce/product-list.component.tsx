import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon, MenuIcon } from '../../components/icons';
import ContentView from '../../layouts/ecommerce/product-list';

export const ProductListScreen = ({ navigation }): React.ReactElement => {

  const renderMenuAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={navigation.toggleDrawer}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='All Products'
        style={{backgroundColor:"lightblue"}}
        accessoryLeft={renderMenuAction} 
      />
      <ContentView/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
