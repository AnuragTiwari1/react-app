import React from "react";
import * as styles from "./styles";

const Loader = props => {
  const {
    LoaderContainer,
    LoaderModal,
    ModalBackground,
    LoaderWrapper,
    Loader,
    Text
  } = styles;
  return (
    <LoaderContainer>
      <LoaderModal
        transparent={true}
        animationType={"none"}
        visible={props.showLoader}
        onRequestClose={() => {}}
      >
        <ModalBackground>
          <LoaderWrapper>
            <Loader size="large" animating={true} color="#fff" />
            <Text>Loading Ads</Text>
          </LoaderWrapper>
        </ModalBackground>
      </LoaderModal>
    </LoaderContainer>
  );
};

export default Loader;
