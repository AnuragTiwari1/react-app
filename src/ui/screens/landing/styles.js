import styled from "styled-components";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "./../../../helpers/responsive";
import responsiveFontSize from "react-native-responsive-fontsize"

export const TextLoader =styled.Text`
  font-size: ${responsiveFontSize(1.8)};
  color: #FFFFFF;
`;
