package com.roomly.roomly.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.roomly.roomly.dto.request.business.BusinessNumberCheckRequestDto;
import com.roomly.roomly.dto.response.ResponseDto;

@RestController
@RequestMapping("/api")
public class BusinessNumberCheckController {
    
    private final WebClient webClient;

    @Value("${order.api.url}")
    private String oderUrl;
    
    public BusinessNumberCheckController(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.baseUrl(oderUrl).build();
        }

    @PostMapping("/validate-business")
    public ResponseEntity<ResponseDto> getBusinessInfo(
        @RequestBody BusinessNumberCheckRequestDto requestDto
    ){

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            
            Map<String, Object> body = new HashMap<>();
            List<Map<String, String>> businesses = new ArrayList<>();
            Map<String, String> business = new HashMap<>();
            business.put("b_no", requestDto.getB_no());
            business.put("start_dt", requestDto.getStart_dt());
            business.put("p_nm", requestDto.getP_nm());
            business.put("b_sector", requestDto.getB_sector());
            businesses.add(business);
            body.put("businesses", businesses);

            String jsonBody = objectMapper.writeValueAsString(body);

            // Headers 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // HttpEntity 생성
            HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

            // URI 설정
            String encodedUrl = "http://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=RJWxEOsz2W9Cf7%2FY8F8TUiyt%2F9fydQGG%2FvUWiDE%2FzfGfx6CwkZBzxCRwzwRQkC89Fq1%2Bd1G44yIWtBK8iIn1NQ%3D%3D";

            URI uri = URI.create(encodedUrl);

            RestTemplate restTemplate = new RestTemplate();
            
            
            ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, String.class);
            
            boolean isSuccessed = response.getBody().contains("숙박업");
            if (!isSuccessed) return null;
            
            return ResponseDto.success();

            // System.out.println(response.getBody());
            // // return response;
            // return ResponseDto.success();
            
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        
    }
}
