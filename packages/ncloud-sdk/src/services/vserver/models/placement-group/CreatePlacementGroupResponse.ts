/**
 * 물리 배치 그룹 생성 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-placementgroup-createplacementgroup}
 * @example
 * {
 *   "requestId": "",
 *   "returnCode": 0,
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "placementGroupList": [
 *     {
 *       "placementGroupNo": "***61",
 *       "placementGroupName": "test-***",
 *       "placementGroupType": {
 *         "code": "AA",
 *         "codeName": "Anti-Affinity"
 *       }
 *     }
 *   ]
 * }
 */
type CreatePlacementGroupResponse = {
    requestId: string;
    returnCode: number;
    returnMessage: string;
    totalRows: number;
    placementGroupList: Array<{
        placementGroupNo: string;
        placementGroupName: string;
        placementGroupType: {
            code: string;
            codeName: string;
        };
    }>;
};
