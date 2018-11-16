import styled from "styled-components";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "./../../../helpers/responsive";
import responsiveFontSize from "react-native-responsive-fontsize"

export const Container = styled.View`
  flex:1;
  justifyContent: center;
  alignItems: center;
`;

export const Spinner = styled.Image`
  width: ${widthPercentageToDP(90)};
  height:${widthPercentageToDP(90)};
`
export const TextLoader =styled.Text`
  font-size: ${responsiveFontSize(1.8)};
  color: #FFFFFF;
`;
