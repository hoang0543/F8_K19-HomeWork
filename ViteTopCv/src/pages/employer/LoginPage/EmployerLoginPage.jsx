import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {
    Box,
    Stack,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import styles from "./EmployerLoginPage.module.css";

import {loginEmployer} from "../../../services/authService.js";

/* =========================
   LOGO
========================= */

function TopCvLogo({size = 34, light = false}) {
    return (
        <Typography
            component="span"
            className={styles.logo}
            style={{fontSize: size}}
        >
            <Box
                component="span"
                className={
                    light
                        ? styles.logoTopLight
                        : styles.logoTop
                }
            >
                top
            </Box>

            <Box
                component="span"
                className={styles.logoCv}
            >
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
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#fff"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l6-6C33.9 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
            />
        </svg>
    );
}

/* =========================
   ANALYTICS ILLUSTRATION
========================= */

function AnalyticsIllustration() {
    return (
        <Box className={styles.analytics}>
            <svg
                viewBox="0 0 320 260"
                width="100%"
                className={styles.analyticsSvg}
            >
                {/* Grid */}
                <g
                    opacity={0.15}
                    stroke="#fff"
                    strokeWidth="1"
                >
                    {[0, 1, 2, 3, 4].map((i) => (
                        <line
                            key={`h-${i}`}
                            x1="10"
                            y1={40 + i * 22}
                            x2="150"
                            y2={40 + i * 22}
                        />
                    ))}

                    {[0, 1, 2, 3, 4].map((i) => (
                        <line
                            key={`v-${i}`}
                            x1={10 + i * 35}
                            y1="40"
                            x2={10 + i * 35}
                            y2="128"
                        />
                    ))}
                </g>

                {/* Trend line */}
                <polyline
                    points="20,110 55,90 90,100 125,60 150,70"
                    fill="none"
                    stroke="#FF9B45"
                    strokeWidth="3"
                />

                {[
                    [20, 110],
                    [55, 90],
                    [125, 60],
                ].map(([x, y], index) => (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={4}
                        className={styles.analyticsGreen}
                    />
                ))}

                {/* Bar chart */}
                <rect
                    x="190"
                    y="150"
                    width="26"
                    height="60"
                    rx="4"
                    className={`${styles.analyticsGreen} ${styles.barLight}`}
                />

                <rect
                    x="222"
                    y="120"
                    width="26"
                    height="90"
                    rx="4"
                    className={styles.analyticsGreen}
                />

                <rect
                    x="254"
                    y="90"
                    width="26"
                    height="120"
                    rx="4"
                    className={`${styles.analyticsGreen} ${styles.barMedium}`}
                />

                {/* Donut */}
                <circle
                    cx="110"
                    cy="190"
                    r="34"
                    fill="none"
                    stroke="#00B14F"
                    strokeWidth="14"
                    opacity={0.85}
                />

                <circle
                    cx="110"
                    cy="190"
                    r="34"
                    fill="none"
                    stroke="#FF9B45"
                    strokeWidth="14"
                    strokeDasharray="60 160"
                    transform="rotate(-90 110 190)"
                />

                {/* Stars */}
                <text
                    x="30"
                    y="35"
                    fontSize="18"
                    fill="#fff"
                    opacity="0.8"
                >
                    ✦
                </text>

                <text
                    x="245"
                    y="55"
                    fontSize="14"
                    fill="#fff"
                    opacity="0.6"
                >
                    ✦
                </text>
            </svg>
        </Box>
    );
}

/* =========================
   PAGE
========================= */

export default function EmployerLoginPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] =
        useState(false);

    const [serverError, setServerError] =
        useState("");

    /* =========================
       CHANGE
    ========================= */

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setServerError("");
    };

    /* =========================
       REGISTER
    ========================= */

    const handleRegister = () => {
        navigate("/employer/register");
    };

    /* =========================
       CANDIDATE LOGIN
    ========================= */

    const handleCandidateLogin = () => {
        navigate("/candidate/login");
    };

    /* =========================
       LOGIN
    ========================= */

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!formData.email.trim()) {
            setServerError(
                "Vui lòng nhập email"
            );

            return;
        }

        if (!formData.password) {
            setServerError(
                "Vui lòng nhập mật khẩu"
            );

            return;
        }

        try {
            setLoading(true);
            setServerError("");

            const payload = {
                email: formData.email.trim(),
                password: formData.password,
            };

            console.log(
                "EMPLOYER LOGIN PAYLOAD:",
                payload
            );

            const data =
                await loginEmployer(payload);

            console.log(
                "EMPLOYER LOGIN RESPONSE:",
                data
            );

            /* =========================
               SAVE TOKEN
            ========================= */

            localStorage.setItem(
                "access_token",
                data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            /* =========================
               CHECK ROLE
            ========================= */

            if (
                data.user?.role !== "EMPLOYER"
            ) {
                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "user"
                );

                setServerError(
                    "Tài khoản này không phải tài khoản nhà tuyển dụng"
                );

                return;
            }

            /* =========================
               REDIRECT
            ========================= */

            navigate("/employer/dashboard", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "EMPLOYER LOGIN ERROR:",
                error.response?.data || error
            );

            const detail =
                error.response?.data?.detail;

            if (
                typeof detail === "string"
            ) {
                setServerError(detail);
            } else if (
                Array.isArray(detail)
            ) {
                setServerError(
                    detail
                        .map(
                            (item) =>
                                item.msg
                        )
                        .join(", ")
                );
            } else {
                setServerError(
                    "Email hoặc mật khẩu không chính xác"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className={styles.page}>
            {/* =========================
          LEFT PANEL
      ========================= */}

            <Box className={styles.leftPanel}>
                <Box
                    className={
                        styles.formContainer
                    }
                >
                    {/* LOGO */}

                    <Box
                        className={styles.logoLink}
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        <TopCvLogo size={30}/>
                    </Box>

                    {/* HEADING */}

                    <Typography
                        className={styles.title}
                    >
                        Chào mừng bạn đã quay trở lại
                    </Typography>

                    <Typography
                        className={
                            styles.description
                        }
                    >
                        Cùng tạo dựng lợi thế cho doanh
                        nghiệp bằng trải nghiệm công nghệ
                        tuyển dụng ứng dụng sâu AI &
                        Hiring Funnel.
                    </Typography>

                    {/* GOOGLE LOGIN */}

                    <Button
                        fullWidth
                        type="button"
                        variant="contained"
                        startIcon={<GoogleG/>}
                        className={
                            styles.googleButton
                        }
                    >
                        Đăng nhập bằng Google
                    </Button>

                    {/* =========================
              FORM
          ========================= */}

                    <Stack
                        spacing={2.5}
                        component="form"
                        noValidate
                        onSubmit={handleLogin}
                    >
                        {/* EMAIL */}

                        <Box>
                            <Typography
                                className={
                                    styles.formLabel
                                }
                            >
                                Email
                            </Typography>

                            <TextField
                                fullWidth
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={loading}
                                className={
                                    styles.input
                                }
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlinedIcon/>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>

                        {/* PASSWORD */}

                        <Box>
                            <Typography
                                className={
                                    styles.formLabel
                                }
                            >
                                Mật khẩu
                            </Typography>

                            <TextField
                                fullWidth
                                name="password"
                                placeholder="Mật khẩu"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={loading}
                                className={
                                    styles.input
                                }
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon/>
                                            </InputAdornment>
                                        ),

                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    type="button"
                                                    edge="end"
                                                    disabled={
                                                        loading
                                                    }
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prev) =>
                                                                !prev
                                                        )
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
                                    },
                                }}
                            />

                            {/* FORGOT PASSWORD */}

                            <Stack
                                direction="row"
                                className={
                                    styles.forgotPasswordWrapper
                                }
                            >
                                <Link
                                    component="button"
                                    type="button"
                                    underline="hover"
                                    className={
                                        styles.forgotPassword
                                    }
                                >
                                    Quên mật khẩu
                                </Link>
                            </Stack>
                        </Box>

                        {/* SERVER ERROR */}

                        {serverError && (
                            <Typography
                                className={
                                    styles.serverError
                                }
                            >
                                {serverError}
                            </Typography>
                        )}

                        {/* LOGIN BUTTON */}

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={loading}
                            className={
                                styles.loginButton
                            }
                        >
                            {loading
                                ? "Đang đăng nhập..."
                                : "Đăng nhập"}
                        </Button>
                    </Stack>

                    {/* REGISTER */}

                    <Typography
                        className={
                            styles.registerText
                        }
                    >
                        Chưa có tài khoản?{" "}
                        <Link
                            component="button"
                            type="button"
                            underline="hover"
                            onClick={
                                handleRegister
                            }
                        >
                            Đăng ký ngay
                        </Link>
                    </Typography>

                    {/* CANDIDATE LOGIN */}

                    <Typography
                        className={
                            styles.candidateText
                        }
                    >
                        Bạn là ứng viên?{" "}
                        <Link
                            component="button"
                            type="button"
                            underline="hover"
                            className={
                                styles.candidateLink
                            }
                            onClick={
                                handleCandidateLogin
                            }
                        >
                            Đăng nhập tại đây
                        </Link>
                    </Typography>

                    {/* COPYRIGHT */}

                    <Typography
                        className={
                            styles.mobileCopyright
                        }
                    >
                        © 2014-
                        {new Date().getFullYear()} TopCV
                        Vietnam JSC. All rights reserved.
                    </Typography>
                </Box>
            </Box>

            {/* =========================
          RIGHT PANEL
      ========================= */}

            <Box
                className={styles.rightPanel}
            >
                <Typography
                    className={
                        styles.rightTitle
                    }
                >
                    Theo dõi hiệu quả tuyển dụng
                    với{" "}
                    <Box
                        component="span"
                        className={
                            styles.highlight
                        }
                    >
                        Báo cáo
                    </Box>
                </Typography>

                <AnalyticsIllustration/>

                <Stack
                    spacing={2}
                    className={
                        styles.rightBottom
                    }
                >
                    {/* DOTS */}

                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        {[0, 1, 2].map(
                            (index) => (
                                <Box
                                    key={index}
                                    className={
                                        index === 0
                                            ? `${styles.sliderDot} ${styles.sliderDotActive}`
                                            : styles.sliderDot
                                    }
                                />
                            )
                        )}
                    </Stack>

                    <TopCvLogo
                        size={22}
                        light
                    />

                    <Typography
                        className={
                            styles.slogan
                        }
                    >
                        Tiếp lợi thế, nối thành công
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}