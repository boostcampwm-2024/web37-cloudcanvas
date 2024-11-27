import { formatProperties } from './formatter';

export const generateTerraformBlock = (
    providerSource: string,
    version: string,
): string => `
terraform {
  required_providers {
    ncloud = {
      source = "${providerSource}"
    }
  }
  required_version = "${version}"
}`;

export const generateProviderBlock = (
    name: string,
    properties: { [key: string]: any },
): string => `
provider "${name}" {
${formatProperties(properties)}
}`;

export const generateResourceBlock = (
    serviceType: string,
    name: string,
    properties: { [key: string]: any },
): string => `
resource "${serviceType}" "${name}" {
${formatProperties(properties)}
}`;
