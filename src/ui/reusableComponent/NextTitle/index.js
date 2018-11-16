import React from "react";

import * as styled from "./styles";

const NextTitle = ({ navigation, children, ...props }) => {
  const onPress = props.nextClicked;
  // TODO: logic for SingIn and others...
  const disabled = props.disabled ? props.disabled : false;
  const defaultDisabledText = { color: disabled ? "gray" : "#2270c9" };
  const defaultDisabledContainer ={backgroundColor: disabled ? "#ffffff00" : "red"};
  const { NextTitleContainer, NextTitleText } = styled;
  return (
    <NextTitleContainer style={defaultDisabledContainer} onPress={onPress} disabled={disabled}>
      <NextTitleText style={defaultDisabledText}>{children}</NextTitleText>
    </NextTitleContainer>
  );
};

export default NextTitle;
