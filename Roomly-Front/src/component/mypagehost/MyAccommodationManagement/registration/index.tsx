import Topbar from "src/component/topbar";
import "./style.css";
import React, { useState } from "react";
import HostMypageLayout from "src/layout/mypageHost";


import { SignInHost } from "src/stores";
import HostAccommodationRegisterForm from "./accommodationRegistrationform";


export default function HostAccommodationRegister() {
    const {signInHost} = SignInHost()
    const [name, setName] = useState<string>('');
  return (
    <>
    <Topbar/>
      <div className="test">
      <HostMypageLayout />
      {/* 상단 환영 문구 */}
      <div id="host-accommodation-register-wrapper">
      <div className="welcome-message"> 호스트 '{signInHost?.hostName}'님, 반갑습니다.</div>
      <HostAccommodationRegisterForm />

      </div>
      </div>
      </>
  );
}
