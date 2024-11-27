import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react';

type SelectedResource = {
    id: string;
    type: string;
    properties: { [key: string]: string };
};

type NCloudContextProps = {
    region: string;
    vpc: string;
    vpcList: { [id: string]: string };
    subnet: string;
    subnetList: { [id: string]: string };
    selectedResource: SelectedResource | undefined;
    setSelectedResource: Dispatch<SetStateAction<SelectedResource | undefined>>;
    setRegion: Dispatch<SetStateAction<string>>;
    setVpc: Dispatch<SetStateAction<string>>;
    setVpcList: Dispatch<SetStateAction<{ [id: string]: string }>>;
    setSubnet: Dispatch<SetStateAction<string>>;
    setSubnetList: Dispatch<SetStateAction<{ [id: string]: string }>>;
};

const NCloudContext = createContext<NCloudContextProps | undefined>(undefined);

export const NCloudProvider = ({ children }: PropsWithChildren) => {
    const [region, setRegion] = useState<string>('kr');
    const [vpc, setVpc] = useState<string>('');
    const [vpcList, setVpcList] = useState<{
        [id: string]: string;
    }>({});
    const [subnet, setSubnet] = useState<string>('');
    const [subnetList, setSubnetList] = useState<{
        [id: string]: string;
    }>({});

    const [selectedResource, setSelectedResource] = useState<
        SelectedResource | undefined
    >(undefined);

    return (
        <NCloudContext.Provider
            value={{
                region,
                vpc,
                vpcList,
                subnetList,
                subnet,
                setRegion,
                setVpc,
                setVpcList,
                setSubnet,
                setSubnetList,
                selectedResource,
                setSelectedResource,
            }}
        >
            {children}
        </NCloudContext.Provider>
    );
};

export const useNCloudContext = () => {
    const context = useContext(NCloudContext);
    if (!context) {
        throw new Error('NCloudContext: context is undefined');
    }
    return context;
};
