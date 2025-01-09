export interface ACGRule {
    accessControlGroupNo: string;
    inbound?: NetworkRule[];
    outbound?: NetworkRule[];
}
