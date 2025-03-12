package com.roomly.roomly.handler;

import java.util.Map;
import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.roomly.roomly.common.object.GuestOAuth2sUser;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
// OAuth2 유저 Service 작업이 성공했을 경우 처리하는 클래스
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
    
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException, ServletException {

        GuestOAuth2sUser guestOAuth2sUser = (GuestOAuth2sUser)authentication.getPrincipal();
        Map<String, Object> attributes = guestOAuth2sUser.getAttributes();
        boolean existed = guestOAuth2sUser.isExisted();
        
        // 회원가입 O
        if(existed){
            String accessToken = (String) attributes.get("accessToken");
            response.sendRedirect("http://localhost:3000/sns-success?accessToken=" + accessToken + "&expiration=36000");
        
        }
        // 회원가입 X
        else {
            String snsId = (String)attributes.get("snsId");
            String joinPath = (String) attributes.get("joinPath");
            response.sendRedirect("http://localhost:3000/auth?snsId="+ snsId + "&joinPath="+joinPath);
        } 

    }
}
