import { inject, observer } from "mobx-react";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/common/Header";
import stores from "../../stores";
import AuthStore from "../../stores/Auth";
import PostStore from "../../stores/Post";

interface HeaderContainerProps {
  store?: StoreType;
}

interface StoreType {
  AuthStore: AuthStore;
  PostStore: PostStore;
}

const HeaderContainer = ({ store }: HeaderContainerProps) => {
  const { showModal } = store!.AuthStore;
  const { tapState, tapClickHandler } = store!.PostStore;

  const [hide, setHide] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
  const [pageY, setPageY] = useState<number>(0);

  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    const shadow = pageYOffset > 50 && deltaY < 0;
    setShadow(shadow);
    setHide(hide);
    setPageY(pageYOffset);
  };

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () => documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  return (
    <>
      <Header shadow={shadow} hide={hide} showModal={showModal} tapState={tapState} tapClickHandler={tapClickHandler} />
    </>
  );
};

export default inject("store")(observer(HeaderContainer));
