import styled from "styled-components";
import responsiveFontSize from "react-native-responsive-fontsize";

const NextTitleContainer = styled.TouchableOpacity`
  margin-top:15;
  paddingHorizontal: 15;
  borderRadius:15;
  alignItems:center;
  justifyContent:center;
`;

const NextTitleText = styled.Text`
  font-size: ${responsiveFontSize(5)};
  fontWeight:800;
  color: #2270c9;
`;

export { NextTitleContainer, NextTitleText };
