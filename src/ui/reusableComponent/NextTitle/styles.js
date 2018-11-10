import styled from "styled-components";
import responsiveFontSize from "react-native-responsive-fontsize";

const NextTitleContainer = styled.TouchableOpacity`
  padding-right: 15;
`;

const NextTitleText = styled.Text`
  font-size: ${responsiveFontSize(3)};
  color: #2270c9;
`;

export { NextTitleContainer, NextTitleText };
