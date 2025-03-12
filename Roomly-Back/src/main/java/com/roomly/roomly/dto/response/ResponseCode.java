package com.roomly.roomly.dto.response;

public interface ResponseCode {

    // SUCCESS
    String SUCCESS = "SU";

    // ERROR_CODE 400 실패 
    String DUPLICATED_IMAGE = "DIM";
    String DUPLICATED_ACCOMMODATION_NAME = "DAN";
    String DUPLICATED_ROOM = "DR";
    String DUPLICATED_ID = "DI";
    String DUPLICATED_TELNUMBER = "DT";
    String DUPLICATED_BUSINESS_NUMBER = "DBN";
    String DUPLICATED_PASSWORD = "DP";
    String DUPLICATED_INTRODUCE = "DIC";
    String NO_EXIST_ROOM = "NR";
    String NO_EXIST_TYPE = "NTY";
    String NO_EXIST_INTRODUCE = "NTD";
    String NO_EXIST_USER_ID = "NI";
    String NO_EXIST_ACCOMMODATION = "NA";
    String NO_EXIST_IMAGE = "NM";
    String VALIDATION_FALIL = "VF";
    String DUPLICATED_RESERVATION = "DR";
    String NO_EXIST_GUEST = "NG";
    String NO_EXIST_HOST = "NH";
    String NO_EXIST_USE_INFORMATION = "NU";
    String NO_EXIST_TELNUMBER = "NET";
    String NO_EXIST_BOOKMARK = "NEB";
    String NO_EXIST_PAYMENT_ID = "NEPI";
    String NOT_MATCH_VALUE = "NMV";
    String NO_EXIST_REVIEW_GUEST_ID = "NERGI";
    String NO_EXIST_RESERVATION_ID = "NI";
    String NOT_MATCH_PASSWORD = "NMP";    
    String NO_EXIST_RESERVATION = "NER";
    String NO_EXIST_REVIEW_ACCOMMODATION_NAME = "NERAN";

    // ERROR_CODE 401
    String TEL_AUTH_FAILE = "TAF"; 
    String SIGN_IN_FAIL = "SF";
    String NO_PERMISSION = "NP";
    String AUTHENTICATION_FAIL = "AF";
    String SIGNIN_FAIL = "SI";
    String DELETE_FAIL = "DF";
    String EXISTED_RESERVATION = "ER";
    String ENTRY_FAIL = "EF";

    // ERROR_CODE 500
    String MESSAGE_SEND_FAILE = "MSF";
    String TOKEN_CREATE_FAIL= "TCF";
    String DATABASE_ERROR = "DBE"; 

    
}
