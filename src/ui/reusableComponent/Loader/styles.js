import styled from "styled-components";
import responsiveFontSize from "react-native-responsive-fontsize";

const LoaderContainer = styled.View`
  width: 100%;
`;

const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: #00000040;
`;

const LoaderWrapper = styled.View`
  background-color: #00000090;
  height: 100;
  width: 100;
  border-radius: 10;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;



const LoaderModal = styled.Modal``;
const Loader = styled.ActivityIndicator``;

export { LoaderContainer, LoaderModal, ModalBackground, LoaderWrapper, Loader };
