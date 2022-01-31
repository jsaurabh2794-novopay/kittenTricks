import React from "react";
import {
  Dimensions,
  ImageBackground,
  ListRenderItemInfo,
  View,
} from "react-native";
import {
  Button,
  Card,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { CartIcon } from "./extra/icons";
import { Product } from "./extra/data";
import { medusaProducts } from "./extra/products";

const products = medusaProducts;

export const ProductListScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const displayProducts = products.filter(
    (product) => product.category === route.name
  );

  const onItemPress = (item: any): void => {
    navigation && navigation.navigate("ProductDetails3",item);
  };

  const onItemCartPress = (index: number): void => {
    navigation && navigation.navigate("ShoppingCart");
  };

  const renderItemFooter = (info) => (
    <View style={styles.itemFooter}>
      <Text category="s1">${info.item.formattedPrice}</Text>
      <Button
        style={styles.iconButton}
        size="small"
        accessoryLeft={CartIcon}
        onPress={() => onItemCartPress(info.index)}
      />
    </View>
  );

  const renderItemHeader = (info) => {
    return (
      <ImageBackground
        style={styles.itemHeader}
        source={{ uri: info.item.thumbnail }}
      />
    );
  };

  const renderProductItem = (info) => {
    return (
      <Card
        style={styles.productItem}
        header={() => renderItemHeader(info)}
        footer={() => renderItemFooter(info)}
        onPress={() => onItemPress(info.item)}
      >
        <Text category="s1">{info.item.title}</Text>
        <Text appearance="hint" category="c1">
          {info.item.category}
        </Text>
      </Card>
    );
  };

  return (
    <List
      contentContainerStyle={styles.productList}
      data={(displayProducts.length && displayProducts) || products}
      numColumns={2}
      renderItem={renderProductItem}
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get("window").width / 2 - 24,
    backgroundColor: "background-basic-color-1",
  },
  itemHeader: {
    flex: 1,
    justifyContent: "center",
    height: 140,
    width: "100%",
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
