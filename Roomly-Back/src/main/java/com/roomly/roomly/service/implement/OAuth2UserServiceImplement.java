package com.roomly.roomly.service.implement;

import java.util.Map;
import java.util.HashMap;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.roomly.roomly.common.object.GuestOAuth2sUser;
import com.roomly.roomly.entity.GuestEntity;
import com.roomly.roomly.provider.JwtProvider;
import com.roomly.roomly.repository.GuestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService {

    private final JwtProvider jwtProvider;
    private final GuestRepository guestRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(request);
        String registration = request.getClientRegistration().getClientName().toLowerCase();

        try {
            System.out.println("=========================================================================");
            System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
            System.out.println(oAuth2User.getName());

        } catch (Exception e) {
            e.printStackTrace();
        }

        String snsId = getSnsId(oAuth2User, registration);

        GuestEntity guestEntity = guestRepository.findBySnsIdAndJoinPath(snsId, registration);

        GuestOAuth2sUser guestOAuth2User = null;

        if (guestEntity == null) {
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("snsId", snsId);
            attributes.put("joinPath", registration);
            guestOAuth2User = new GuestOAuth2sUser(snsId, attributes, false);
        }else {
            String guestId = guestEntity.getGuestId();
            String token = jwtProvider.createGuestToken(guestId);

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("accessToken", token);

            guestOAuth2User = new GuestOAuth2sUser(token, attributes, true);
        }

        return guestOAuth2User;
    }

    private String getSnsId(OAuth2User oAuth2User, String registration) {
        String snsId = null;

        if (registration.equals("kakao")) {
            snsId = oAuth2User.getName();
        }
        if(registration.equals("google")) {
            snsId = (String) oAuth2User.getAttributes().get("sub");
        }
        
        return snsId;
    }

}