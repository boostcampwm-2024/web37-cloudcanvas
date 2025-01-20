interface OidcConfig {
    issuerUrl: string;
    clientId: string;
    usernamePrefix?: string;
    usernameClaim?: string;
    groupsPrefix?: string;
    groupsClaim?: string;
    requiredClaim?: string;
}
