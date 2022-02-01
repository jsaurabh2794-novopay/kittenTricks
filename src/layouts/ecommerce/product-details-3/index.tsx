import React, { Fragment } from "react";
import { ImageBackground, Platform, View, ScrollView } from "react-native";
import {
  Button,
  Card,
  Input,
  Layout,
  List,
  Radio,
  RadioGroup,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "./extra/keyboard-avoiding-view.component";
import { CommentList } from "./extra/comment-list.component";
import { Product, ProductColor } from "./extra/data";
import { useState } from "react";
import { HeartIcon, MessageCircleIcon } from "./extra/icons";

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

export default ({ navigation, route }): React.ReactElement => {
  const [comment, setComment] = React.useState<string>();
  const [commentList, setCommentList] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState<number>();
  const [selectSizeIndex, setSelectedSizeIndex] = React.useState<number>();
  const styles = useStyleSheet(themedStyles);
  const product = route.params;

  const addCommentsHandler = () => {
    setCommentList([...commentList, comment]);
    setComment("");
  };

  const commentListViewHandler = (info) => {
    return (
      <Card style={styles.commentItem}>
        <Text>{info.item}</Text>
        <View style={styles.commentReactionsContainer}>
          <Button
            style={styles.iconButton}
            appearance="ghost"
            status="basic"
            accessoryLeft={MessageCircleIcon}
          >
            {`0`}
          </Button>
          <Button
            style={styles.iconButton}
            appearance="ghost"
            status="danger"
            accessoryLeft={HeartIcon}
          >
            {`0`}
          </Button>
        </View>
      </Card>
    );
  };
  const onBuyButtonPress = (): void => {
    navigation && navigation.navigate("Payment", product);
  };

  const onAddButtonPress = (): void => {
    navigation && navigation.navigate("ShoppingCart", product);
  };

  const sizeOptions: any = product?.options?.find(
    (item) => item.title === "Size"
  );
  const sizes = sizeOptions?.values;
  const colorOptions: any = product?.options?.find(
    (item) => item.title === "Color"
  );
  const colors: any = colorOptions?.values;

  const renderColorItem = (color, index: number): React.ReactElement => (
    <Radio key={index} style={styles.colorRadio}>
      {(evaProps) => (
        <Text {...evaProps} style={{ marginLeft: 10 }}>
          {color.value.toUpperCase()}
        </Text>
      )}
    </Radio>
  );
  const renderSizeItem = (size, index: number): React.ReactElement => (
    <Radio key={index} style={styles.colorRadio}>
      {(evaProps) => (
        <Text {...evaProps} style={{ marginLeft: 10 }}>
          {size.value.toUpperCase()}
        </Text>
      )}
    </Radio>
  );

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header}>
      <ImageBackground
        style={styles.image}
        source={{ uri: product.thumbnail }}
      />
      <Layout style={styles.detailsContainer} level="1">
        <Text category="h6">{product.title}</Text>
        <Text style={styles.subtitle} appearance="hint" category="p2">
          {product.category}
        </Text>
        <Text style={styles.price} category="h4">
          ${product.formattedPrice}
        </Text>
        <Text style={styles.description} appearance="hint">
          {product.description}
        </Text>
        <Text style={styles.sectionLabel} category="h6">
          Size:
        </Text>
        {sizes && sizes.length > 0 && (
          <ScrollView horizontal={true}>
            <RadioGroup
              style={styles.colorGroup}
              selectedIndex={selectSizeIndex}
              onChange={setSelectedSizeIndex}
            >
              {sizes.map(renderSizeItem)}
            </RadioGroup>
          </ScrollView>
        )}
        {!sizes && <Text>Not Available</Text>}
        <Text style={styles.sectionLabel} category="h6">
          Color:
        </Text>
        {colors && colors.length > 0 && (
          <ScrollView horizontal={true}>
            <RadioGroup
              style={styles.colorGroup}
              selectedIndex={selectedColorIndex}
              onChange={setSelectedColorIndex}
            >
              {colors.map(renderColorItem)}
            </RadioGroup>
          </ScrollView>
        )}
        {!colors && <Text>Not Available</Text>}
        <View style={styles.actionContainer}>
          <Button
            style={styles.actionButton}
            size="giant"
            onPress={onBuyButtonPress}
          >
            BUY
          </Button>
          <Button
            style={styles.actionButton}
            size="giant"
            status="control"
            onPress={onAddButtonPress}
          >
            ADD TO BAG
          </Button>
        </View>
      </Layout>
      <Input
        style={styles.commentInput}
        label={(evaProps) => (
          <Text {...evaProps} style={styles.commentInputLabel}>
            Comments
          </Text>
        )}
        placeholder="Write your comment"
        value={comment}
        onChangeText={setComment}
        onBlur={addCommentsHandler}
      />

      <List data={commentList} renderItem={commentListViewHandler} />
    </Layout>
  );

  return (
    <KeyboardAvoidingView style={styles.container} offset={keyboardOffset}>
      <CommentList
        style={styles.commentList}
        data={product.comments}
        ListHeaderComponent={renderHeader()}
      />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  commentList: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    marginBottom: 8,
  },
  image: {
    height: 340,
    width: "100%",
  },
  detailsContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  subtitle: {
    marginTop: 4,
  },
  price: {
    position: "absolute",
    top: 24,
    right: 16,
  },
  description: {
    marginVertical: 16,
  },
  size: {
    marginBottom: 16,
  },
  colorGroup: {
    flexDirection: "row",
    marginHorizontal: -8,
  },
  colorRadio: {
    marginHorizontal: 8,
  },
  actionContainer: {
    flexDirection: "row",
    marginHorizontal: -8,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  sectionLabel: {
    marginVertical: 8,
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "text-basic-color",
  },
  commentInput: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  commentItem: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  commentHeader: {
    flexDirection: "row",
    padding: 16,
  },
  commentAuthorContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  commentReactionsContainer: {
    flexDirection: "row",
    marginTop: 8,
    marginHorizontal: -8,
    marginVertical: -8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
