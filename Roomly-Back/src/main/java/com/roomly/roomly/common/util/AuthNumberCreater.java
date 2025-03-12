package com.roomly.roomly.common.util;

import java.util.Random;

public class AuthNumberCreater {
    
     // 0~9의 4자리 인증번호
    public static String number4(){
        
        String authNumber = "";

        Random random = new Random();
        for(int count = 0; count < 4; count++){
            authNumber += random.nextInt(10);
        }

        return authNumber;
    }

}
