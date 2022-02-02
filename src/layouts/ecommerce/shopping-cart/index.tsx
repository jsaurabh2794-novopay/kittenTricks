import React from "react";
import {
  Button,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { CartItem } from "./extra/cart-item.component";
import { useState } from "react";

export default ({ route, navigation }): React.ReactElement => {
  const selectedProduct = route.params;
  const styles = useStyleSheet(themedStyle);
  const [products, setProducts] = React.useState<any[]>([selectedProduct]);
  const [count, setCount] = useState(1);

  const totalCost = (): number => {
    return count * selectedProduct.formattedPrice;
  };

  const onItemRemove = (product: any, index: number): void => {
    products.splice(index, 1);
    setProducts([...products]);
    setCount(0);
  };

  const onItemChange = (product: any, index: number): void => {
    products[index] = product;
    setProducts([...products]);
  };

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category="h5">Total Cost:</Text>
      <Text category="h5">{`$${totalCost()}`}</Text>
    </Layout>
  );

  const renderProductItem = (info) => (
    <CartItem
      count={count}
      setCount={setCount}
      style={styles.item}
      index={info.index}
      product={info.item}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

  const checkoutHandler = () => {
    navigation.navigate("Payment");
  };

  return (
    <Layout style={styles.container} level="2">
      <List
        data={products}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
      />
      <Button
        style={styles.checkoutButton}
        size="giant"
        onPress={checkoutHandler}
      >
        CHECKOUT
      </Button>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
