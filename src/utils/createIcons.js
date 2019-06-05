import { initialExerciseCategory } from "../initialExerciseSets";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { IconFont } from "@expo/vector-icons";
import React from "react";

export const createIcons = (item, index, color) =>
  initialExerciseCategory.includes(item) ? (
    <IconFont name={item} size={60} color={color} />
  ) : index % 7 === 1 ? (
    <IconFontAwesome
      name="space-shuttle"
      size={60}
      color={color}
      key="cancel"
    />
  ) : index % 7 === 2 ? (
    <IconFontAwesome name="fort-awesome" size={60} color={color} key="cancel" />
  ) : index % 7 === 3 ? (
    <IconFontAwesome name="bolt" size={60} color={color} key="cancel" />
  ) : index % 7 === 4 ? (
    <IconFontAwesome name="snowflake-o" size={60} color={color} key="cancel" />
  ) : index % 7 === 5 ? (
    <IconFontAwesome name="life-bouy" size={60} color={color} key="cancel" />
  ) : index % 7 === 6 ? (
    <IconFontAwesome name="tree" size={60} color={color} key="cancel" />
  ) : (
    <IconFontAwesome name="bug" size={60} color={color} key="cancel" />
  );
