export interface GetProductPriceListRequest {
    /**
     * 페이지 번호
     */
    pageNo?: number;
    /**
     * 페이지 크기(1000 이하, 기본값 1000)
     */
    pageSize?: number;
    /**
     * 리전 코드
     */
    regionCode: string;
    /**
     * 상품 품목 종류 코드
     */
    productItemKindCode?: string;
    /**
     * 상품 카테고리 코드
     */
    productCategoryCode?: string;
    /**
     * 상품 코드
     */
    productCode?: string;
    /**
     * 상품명
     */
    productName?: string;
    /**
     * 결제 통화 코드
     */
    payCurrencyCode?: 'KRW' | 'USD' | 'JPY';
    /**
     * 응답 결과의 형식
     */
    responseFormatType?: 'xml' | 'json';
}
