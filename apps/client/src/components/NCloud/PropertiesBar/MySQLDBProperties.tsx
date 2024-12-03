import {
    MYSQLDBProp,
    validateMySQLDB,
    ValidationErrors,
} from '@/src/models/ncloud/MySQLDB';
import { NETWORKS_CATEGORIES } from '@/src/models/ncloud/Networks';
import useNCloud from '@hooks/useNCloud';
import { FormHelperText } from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import validator from 'validator';

type Props = {};

export default ({}: Props) => {
    const { selectedResource, updateProperties } = useNCloud();

    const [properties, setProperties] = useState({
        serverName: '',
        serverNamePrefix: '',
        userName: '',
        userPassword: '',
        hostIp: '',
        databaseName: '',
        serviceName: '',
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        if (!selectedResource) return;
        const { properties } = selectedResource;
        const {
            serverName,
            serverNamePrefix,
            userName,
            userPassword,
            hostIp,
            serviceName,
            databaseName,
        } = properties;
        setProperties((prev) => ({
            ...prev,
            serverName,
            serverNamePrefix,
            userName,
            serviceName,
            userPassword,
            hostIp: '192.168.0.1',
            databaseName,
        }));
    }, [selectedResource]);

    // 192.168.0.01 임시용
    const handleChange = (e: React.ChangeEvent, type: string) => {
        const value = (e.target as HTMLInputElement).value;
        if (!selectedResource) return;
        const updatedProperties = {
            ...properties,
            [type]: value,
        };
        setProperties(updatedProperties);
        updateProperties(selectedResource.id, {
            [type]: value,
            hostIp: '192.168.0.1',
        });

        const currentErrors = validateMySQLDB(updatedProperties);
        setErrors(currentErrors);
    };

    const propertiesWithoutNetworks = Object.keys(
        selectedResource?.properties ?? {},
    ).filter((prop) => !NETWORKS_CATEGORIES.includes(prop));

    const getLabel = (prop: string) => {
        switch (prop) {
            case 'serverName':
                return `Server Name`;
            case 'serverNamePrefix':
                return `Server Name Prefix`;
            case 'userName':
                return `User Name`;
            case 'userPassword':
                return `User Password`;
            case 'hostIp':
                return `Host IP`;
            case 'databaseName':
                return `Database Name`;
            case 'serviceName':
                return 'Service Name';
            default:
                return 'Unsupport Type';
        }
    };

    return (
        <Stack spacing={2}>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                {propertiesWithoutNetworks.slice(0, 4).map((prop) => (
                    <FormControl
                        key={prop}
                        variant="standard"
                        sx={{
                            minWidth: 300,
                        }}
                    >
                        <InputLabel>{getLabel(prop)}</InputLabel>
                        <Input
                            id={prop}
                            value={
                                properties[prop as keyof typeof properties] ??
                                ''
                            }
                            type={prop === 'userPassword' ? 'password' : 'text'}
                            placeholder={getLabel(prop)}
                            autoComplete="off"
                            onKeyDown={(e) => e.stopPropagation()}
                            onChange={(e) => handleChange(e, prop)}
                        />
                        {errors[prop as keyof MYSQLDBProp] && (
                            <FormHelperText error>
                                {errors[prop as keyof MYSQLDBProp]}
                            </FormHelperText>
                        )}
                    </FormControl>
                ))}
            </Stack>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                {propertiesWithoutNetworks.slice(4).map((prop) => (
                    <FormControl
                        key={prop}
                        variant="standard"
                        sx={{
                            minWidth: 300,
                        }}
                    >
                        <InputLabel>{getLabel(prop)}</InputLabel>
                        <Input
                            id={prop}
                            value={
                                properties[prop as keyof typeof properties] ??
                                ''
                            }
                            disabled={prop === 'hostIp'}
                            placeholder={getLabel(prop)}
                            autoComplete="off"
                            onKeyDown={(e) => e.stopPropagation()}
                            onChange={(e) => handleChange(e, prop)}
                        />
                        {errors[prop as keyof MYSQLDBProp] && (
                            <FormHelperText error>
                                {errors[prop as keyof MYSQLDBProp]}
                            </FormHelperText>
                        )}
                    </FormControl>
                ))}
            </Stack>
        </Stack>
    );
};
