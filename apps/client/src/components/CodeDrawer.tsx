import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    Box,
    Button,
    Drawer,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TypeAnimation } from 'react-type-animation';

type Props = {
    code: string;
    open: boolean;
    onClose: () => void;
};

export default ({ code, open, onClose }: Props) => {
    const theme = useTheme();
    const [copied, setCopied] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // 2초 후 복사 상태 리셋
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 500,
                    padding: theme.spacing(2),
                    backgroundColor: theme.palette.background.default,
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                    }}
                >
                    <Typography variant="h6">Terraform Code Viewer</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ position: 'relative' }}>
                    {!isFinished ? (
                        <Box
                            sx={{
                                mb: 2,
                                fontFamily: 'monospace',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            <TypeAnimation
                                sequence={[code, () => setIsFinished(true)]}
                                speed={80}
                                cursor={true}
                                style={{ fontSize: '14px', lineHeight: '1.5' }}
                                repeat={0}
                            />
                        </Box>
                    ) : (
                        <SyntaxHighlighter language="hcl" style={materialDark}>
                            {code}
                        </SyntaxHighlighter>
                    )}

                    <Button
                        variant="contained"
                        startIcon={<ContentCopyIcon />}
                        onClick={handleCopy}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};
