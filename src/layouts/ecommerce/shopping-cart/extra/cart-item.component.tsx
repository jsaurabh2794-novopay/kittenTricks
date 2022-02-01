import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { CloseIcon, MinusIcon, PlusIcon } from "./icons";
import { Product } from "./data";

export type CartItemProps = ListItemProps & {
  index: number;
  product: Product;
  onProductChange: (product: Product, index: number) => void;
  onRemove: (product: Product, index: number) => void;
};

export const CartItem = (props) => {
  const {
    style,
    product,
    index,
    onProductChange,
    onRemove,
    count,
    setCount,
    ...listItemProps
  } = props;

  const decrementButtonEnabled = (): boolean => {
    return count > 1;
  };

  const onRemoveButtonPress = (): void => {
    onRemove(product, index);
  };

  const onMinusButtonPress = (): void => {
    setCount((prev) => prev - 1);
  };

  const onPlusButtonPress = (): void => {
    setCount((prev) => prev + 1);
  };

  return (
    <ListItem {...listItemProps} style={[styles.container, style]}>
      <Image style={styles.image} source={{ uri: product.thumbnail }} />
      <View style={styles.detailsContainer}>
        <Text category="s1">{product.title}</Text>
        <Text appearance="hint" category="p2">
          {product.category}
        </Text>
        <Text category="s2">${product.formattedPrice}</Text>
        <View style={styles.amountContainer}>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size="tiny"
            accessoryLeft={MinusIcon}
            onPress={onMinusButtonPress}
            disabled={!decrementButtonEnabled()}
          />
          <Text style={styles.amount} category="s2">
            {`${count}`}
          </Text>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size="tiny"
            accessoryLeft={PlusIcon}
            onPress={onPlusButtonPress}
          />
        </View>
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance="ghost"
        status="basic"
        accessoryLeft={CloseIcon}
        onPress={onRemoveButtonPress}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: 120,
    height: 144,
  },
  detailsContainer: {
    flex: 1,
    height: "100%",
    padding: 16,
  },
  amountContainer: {
    position: "absolute",
    flexDirection: "row",
    left: 16,
    bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: "center",
    width: 40,
  },
  removeButton: {
    position: "absolute",
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
