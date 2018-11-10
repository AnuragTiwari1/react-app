import React from "react";

import * as styled from "./styles";

const NextTitle = ({ navigation, children, ...props }) => {
  const onPress = props.nextClicked;
  // TODO: logic for SingIn and others...
  const disabled = props.disabled ? props.disabled : false;
  const defaultDisabled = { color: disabled ? "gray" : "#2270c9" };

  const { NextTitleContainer, NextTitleText } = styled;

  return (
    <NextTitleContainer onPress={onPress} disabled={disabled}>
      <NextTitleText style={defaultDisabled}>{children}</NextTitleText>
    </NextTitleContainer>
  );
};

export default NextTitle;
