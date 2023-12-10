import React from "react";
import { View } from "react-native";

const AbsoluteComponent = ({ children }) => {
  return (
  <View style={{ position: "absolute", left: 0, right: 0, alignItems: "center", justifyContent: "center", height: 150 }}>
    {children}
  </View>
    );
};

export default AbsoluteComponent;
