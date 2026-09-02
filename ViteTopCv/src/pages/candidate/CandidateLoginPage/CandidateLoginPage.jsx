import {useState} from "react";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    Box,
    Paper,
    Stack,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Divider,
    Link,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EastIcon from "@mui/icons-material/East";

import styles from "./CandidateLoginPage.module.css";

/* =========================
   LOGO
========================= */

function TopCvLogo({size = 34}) {
    return (
        <Typography
            component="span"
            className={styles.logo}
            style={{fontSize: size}}
        >
            <Box component="span" className={styles.logoTop}>
                top
            </Box>

            <Box component="span" className={styles.logoCv}>
                cv
            </Box>

            <Box
                component="span"
                className={styles.logoDot}
                style={{
                    fontSize: size * 0.32,
                }}
            >
                ●
            </Box>
        </Typography>
    );
}

/* =========================
   GOOGLE ICON
========================= */

function GoogleG({size = 20}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
        >
            <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l6-6C33.9 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
            />

            <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c2.8 0 5.3 1 7.3 2.7l6-6C33.9 6.1 29.2 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
            />

            <path
                fill="#4CAF50"
                d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.4 26.7 36 24 36c-5.3 0-9.7-3.6-11.3-8.4l-6.5 5C9.5 39.6 16.2 44 24 44z"
            />

            <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C40.9 36 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"
            />
        </svg>
    );
}

/* =========================
   DECORATION
========================= */

function DotArrow() {
    const dots = [];

    const lineCount = 6;
    const dotsPerLine = 14;

    for (let line = 0; line < lineCount; line++) {
        for (let dot = 0; dot < dotsPerLine; dot++) {
            dots.push(
                <circle
                    key={`${line}-${dot}`}
                    cx={dot * 14}
                    cy={line * 14}
                    r={2.5}
                    fill="#00B14F"
                    opacity={0.9 - line * 0.1}
                />
            );
        }
    }

    return (
        <Box className={styles.dotArrow}>
            <svg
                width={dotsPerLine * 14}
                height={lineCount * 14}
            >
                {dots}
            </svg>
        </Box>
    );
}

/* =========================
   PAGE
========================= */

export default function CandidateLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] =
        useState(false);

    const redirectPath =
        location.state?.from || "/jobs";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    /* =========================
       INPUT
    ========================= */

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    /* =========================
       LOGIN
    ========================= */

    const handleLogin = (event) => {
        event.preventDefault();

        console.log("Login data:", formData);

        navigate("/jobs");
    };

    /* =========================
       REGISTER
    ========================= */

    const handleRegister = () => {
        navigate("/candidate/register");
    };

    /* =========================
       EMPLOYER
    ========================= */

    const handleEmployerLogin = () => {
        navigate("/employer/login");
    };

    /* =========================
       FORGOT PASSWORD
    ========================= */

    const handleForgotPassword = () => {
        console.log("Forgot password");
    };

    return (
        <Box className={styles.page}>
            <DotArrow/>

            <Paper
                elevation={0}
                className={styles.card}
            >
                {/* =========================
            HEADER
        ========================== */}

                <Stack
                    alignItems="center"
                    spacing={1}
                    className={styles.header}
                >
                    <TopCvLogo size={30}/>

                    <Typography className={styles.title}>
                        Chào mừng quay trở lại
                    </Typography>
                </Stack>

                {/* =========================
            SOCIAL LOGIN
        ========================== */}

                <Stack spacing={1.5}>
                    <Button
                        fullWidth
                        type="button"
                        variant="outlined"
                        startIcon={<GoogleG/>}
                        className={styles.socialButton}
                    >
                        Đăng nhập bằng Google
                    </Button>

                    <Stack className={styles.socialGroup}>
                        <Button
                            fullWidth
                            type="button"
                            variant="outlined"
                            startIcon={
                                <FacebookIcon
                                    className={styles.facebookIcon}
                                />
                            }
                            className={styles.socialButton}
                        >
                            Facebook
                        </Button>

                        <Button
                            fullWidth
                            type="button"
                            variant="outlined"
                            startIcon={
                                <LinkedInIcon
                                    className={styles.linkedinIcon}
                                />
                            }
                            className={styles.socialButton}
                        >
                            Linkedin
                        </Button>
                    </Stack>
                </Stack>

                {/* =========================
            DIVIDER
        ========================== */}

                <Divider className={styles.divider}>
                    Hoặc đăng nhập bằng email
                </Divider>

                {/* =========================
            FORM
        ========================== */}

                <Stack
                    spacing={2.5}
                    component="form"
                    noValidate
                    onSubmit={handleLogin}
                >
                    {/* EMAIL */}

                    <Box>
                        <Typography className={styles.formLabel}>
                            Email
                        </Typography>

                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            placeholder="Nhập email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </Box>

                    {/* PASSWORD */}

                    <Box>
                        <Stack className={styles.passwordHeader}>
                            <Typography
                                className={`${styles.formLabel} ${styles.passwordLabel}`}
                            >
                                Mật khẩu
                            </Typography>

                            <Link
                                component="button"
                                type="button"
                                underline="hover"
                                className={styles.forgotPassword}
                                onClick={handleForgotPassword}
                            >
                                Quên mật khẩu
                            </Link>
                        </Stack>

                        <TextField
                            fullWidth
                            name="password"
                            placeholder="Nhập mật khẩu"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            type="button"
                                            edge="end"
                                            onClick={() =>
                                                setShowPassword((previous) => !previous)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon/>
                                            ) : (
                                                <VisibilityIcon/>
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* LOGIN BUTTON */}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        endIcon={<EastIcon/>}
                        className={styles.loginButton}
                    >
                        Đăng nhập
                    </Button>
                </Stack>

                {/* =========================
            REGISTER
        ========================== */}

                <Typography className={styles.registerText}>
                    Bạn chưa có tài khoản?{" "}
                    <Link
                        component="button"
                        type="button"
                        underline="hover"
                        className={styles.registerLink}
                        onClick={handleRegister}
                    >
                        Đăng ký ngay
                    </Link>
                </Typography>

                {/* =========================
            SUPPORT
        ========================== */}

                <Box className={styles.supportBox}>
                    <Typography className={styles.supportText}>
                        Bạn gặp khó khăn khi tạo tài khoản? Vui lòng gọi tới số{" "}
                        <Box
                            component="span"
                            className={styles.phone}
                        >
                            1900 068 889
                        </Box>{" "}
                        | Nhánh 2 (giờ hành chính).
                    </Typography>
                </Box>

                {/* =========================
            EMPLOYER LOGIN
        ========================== */}

                <Typography className={styles.employerText}>
                    Bạn là nhà tuyển dụng?{" "}
                    <Link
                        component="button"
                        type="button"
                        underline="hover"
                        className={styles.employerLink}
                        onClick={handleEmployerLogin}
                    >
                        Đăng nhập tại đây
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}