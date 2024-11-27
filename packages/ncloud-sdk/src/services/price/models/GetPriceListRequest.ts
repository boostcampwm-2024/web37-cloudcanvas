export interface GetPriceListRequest {
    /**
     * 조회할 가격 번호 리스트
     */
    priceNoList: string[];
    /**
     * 조회할 약정 번호 리스트
     */
    promiseNoList: string[];
    /**
     * 결제 통화 코드
     */
    payCurrencyCode: 'KRW' | 'USD' | 'JPY';
    /**
     * 응답 결과의 형식
     */
    responseFormatType?: 'xml' | 'json';
}
