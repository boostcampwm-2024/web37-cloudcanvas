import RegionSelect from '@components/NCloud/NetworksBar/RegionSelect';
import SubnetSelect from '@components/NCloud/NetworksBar/SubnetSelect';
import VpcSelect from '@components/NCloud/NetworksBar/VpcSelect';
import useNCloud from '@hooks/useNCloud';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { REGIONS } from '@/src/models/ncloud/constants';

export default () => {
    const {
        selectedResource,
        vpcList,
        subnetList,
        changeVpc,
        changeSubnet,
        removeVpc,
        removeSubnet,
        changeRegion,
    } = useNCloud();

    if (!selectedResource) return;
    const { properties } = selectedResource;

    return (
        <AppBar
            position="fixed"
            className="graph-ignore-select"
            color="default"
            sx={{
                top: 80,
                left: 320,
                right: 0,
                borderRadius: '20px',
                maxWidth: 'min-content',
                display: selectedResource ? 'block' : 'none',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    gap: 2,
                    paddingY: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', sm: 'block' },
                        whiteSpace: 'nowrap',
                    }}
                >
                    {selectedResource.type.toUpperCase()}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Stack
                    direction="row"
                    divider={<ChevronRightIcon />}
                    spacing={2}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <RegionSelect
                        region={properties.region ?? REGIONS['KR']}
                        disabled={Boolean(properties.vpc)}
                        onChangeRegion={changeRegion}
                    />
                    {Object.hasOwn(properties, 'vpc') && properties.region && (
                        <VpcSelect
                            vpc={properties.vpc}
                            vpcList={vpcList}
                            disabled={Boolean(properties.subnet)}
                            onChangeVpc={changeVpc}
                            onRemoveVpc={removeVpc}
                        />
                    )}
                    {Object.hasOwn(properties, 'subnet') && properties.vpc && (
                        <SubnetSelect
                            subnet={properties.subnet}
                            subnetList={subnetList}
                            // disabled={Boolean(properties.subnet)} // scg??
                            onChangeSubnet={changeSubnet}
                            onRemoveSubnet={removeSubnet}
                        />
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
