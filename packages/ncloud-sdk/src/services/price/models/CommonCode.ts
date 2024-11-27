/**
 * CommonCode 객체
 * @see {@link https://api.ncloud-docs.com/docs/common-vapidatatype-commoncode}
 * 추후 통합할 때 Common 폴더로 뺄 예정
 */
export interface CommonCode {
    /**
     * 5자리 이내의 코드
     *
     * Required
     * @example INIT, CREAT, RUN, NSTOP
     */
    code: string;

    /**
     * 코드에 해당하는 코드 이름
     *
     * Required
     * @example INIT 상태, 생성, 운영, 정상 정지
     */
    codeName: string;
}
