import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';

import Service from '@components/Layout/Sidebar/Service';
import SelectPlatform from '@components/Layout/Sidebar/SelectPlatform';
import { NCLOUD_SERVICES } from '@constants';

const CLOUD_PLATFORMS = [
    {
        value: 'ncloud',
        title: 'Naver Cloud Platform',
        imgUrl: 'https://pbs.twimg.com/profile_images/1513858761076604929/O7RUa3BX_400x400.jpg',
    },
];

const SidebarPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.custom.sidebarWidth,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

export default () => {
    return (
        <SidebarPaper elevation={1}>
            <Stack
                spacing={2}
                sx={{
                    p: 1,
                }}
            >
                <SelectPlatform platforms={CLOUD_PLATFORMS} />
                <Divider />
                {/* <Input */}
                {/*     fullWidth */}
                {/*     placeholder="Search services" */}
                {/*     endAdornment={ */}
                {/*         <IconButton> */}
                {/*             <SearchIcon /> */}
                {/*         </IconButton> */}
                {/*     } */}
                {/* /> */}
            </Stack>
            <List
                sx={{
                    flex: 1,
                    padding: 0,
                    overflow: 'auto',
                }}
            >
                {NCLOUD_SERVICES.map((service) => (
                    <Service
                        key={service.title}
                        title={service.title}
                        items={service.items}
                    />
                ))}
            </List>
        </SidebarPaper>
    );
};
