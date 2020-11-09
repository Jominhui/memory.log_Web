import { observer } from "mobx-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../components/common/Header";
import useStore from "../../lib/hooks/useStore";
import refresh from "../../lib/refresh";
import axios from "axios";

const HeaderContainer = () => {
  const { store } = useStore();
  const { showModal, login, getInfo, name } = store.AuthStore;
  const { tapState, tapClickHandler } = store.PostStore;

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

  const getInfoCallback = useCallback(() => {
    if (localStorage.getItem("accessToken")) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
      getInfo().catch(async (err: Error) => {
        if (err.message.indexOf("410")) {
          if (await refresh()) {
            getInfo().catch((err: Error) => {
              console.log("권한 없음");
            });
          }
        }
      });
    }
  }, [login]);

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () => documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  useEffect(() => {
    getInfoCallback();
  }, [getInfoCallback]);

  return (
    <>
      <Header
        shadow={shadow}
        hide={hide}
        showModal={showModal}
        login={login}
        tapState={tapState}
        tapClickHandler={tapClickHandler}
        name={name}
      />
    </>
  );
};

export default observer(HeaderContainer);
