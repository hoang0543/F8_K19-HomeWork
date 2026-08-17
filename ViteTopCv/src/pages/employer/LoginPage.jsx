import {useState} from "react";
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

const GREEN = "#00B14F";
const GREEN_DARK = "#008C40";
const NAVY = "#18191C";
const PANEL_BG = "#0E2233";

/* =========================
   TOPCV LOGO
========================= */

function TopCvLogo({size = 34, light = false}) {
    return (
        <Typography
            component="span"
            sx={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 800,
                fontSize: size,
                letterSpacing: -0.5,
                lineHeight: 1,
            }}
        >
            <Box
                component="span"
                sx={{
                    color: light ? "#fff" : NAVY,
                }}
            >
                top
            </Box>

            <Box
                component="span"
                sx={{
                    color: GREEN,
                }}
            >
                cv
            </Box>

            <Box
                component="span"
                sx={{
                    fontSize: size * 0.32,
                    verticalAlign: "super",
                    color: GREEN,
                    ml: 0.2,
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
   RIGHT SIDE ILLUSTRATION
========================= */

function AnalyticsIllustration() {
    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 420,
                mx: "auto",
            }}
        >
            <svg
                viewBox="0 0 320 260"
                width="100%"
                style={{
                    height: "auto",
                    display: "block",
                }}
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
                        fill={GREEN}
                    />
                ))}

                {/* Bar chart */}

                <rect
                    x="190"
                    y="150"
                    width="26"
                    height="60"
                    rx="4"
                    fill={GREEN}
                    opacity={0.6}
                />

                <rect
                    x="222"
                    y="120"
                    width="26"
                    height="90"
                    rx="4"
                    fill={GREEN}
                />

                <rect
                    x="254"
                    y="90"
                    width="26"
                    height="120"
                    rx="4"
                    fill={GREEN}
                    opacity={0.8}
                />

                {/* Donut */}

                <circle
                    cx="110"
                    cy="190"
                    r="34"
                    fill="none"
                    stroke={GREEN}
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
   MAIN PAGE
========================= */

export default function EmployerLoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: {
                    xs: "column",
                    md: "row",
                },
                margin: 0,
                padding: 0,
                overflow: "hidden",
            }}
        >
            {/* =========================
          LEFT LOGIN PANEL
      ========================= */}

            <Box
                sx={{
                    width: {
                        xs: "100%",
                        md: "66.6667%",
                        lg: "66.6667%",
                    },

                    minHeight: "100vh",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    bgcolor: "#fff",

                    px: {
                        xs: 3,
                        sm: 6,
                        md: 8,
                        lg: 12,
                    },

                    py: {
                        xs: 5,
                        md: 6,
                    },

                    boxSizing: "border-box",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 460,
                    }}
                >
                    {/* Logo */}

                    <TopCvLogo size={30}/>

                    {/* Heading */}

                    <Typography
                        sx={{
                            fontFamily: "Sora, sans-serif",
                            fontWeight: 800,
                            color: GREEN,

                            fontSize: {
                                xs: 22,
                                sm: 26,
                            },

                            lineHeight: 1.35,

                            mt: 4,
                            mb: 1,
                        }}
                    >
                        Chào mừng bạn đã quay trở lại
                    </Typography>

                    {/* Description */}

                    <Typography
                        sx={{
                            fontSize: 14,
                            lineHeight: 1.7,
                            color: "#475467",
                            mb: 3,
                        }}
                    >
                        Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công
                        nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel.
                    </Typography>

                    {/* Google login */}

                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<GoogleG/>}
                        sx={{
                            bgcolor: "#4285F4",
                            color: "#fff",

                            textTransform: "none",

                            fontWeight: 600,

                            borderRadius: 2,

                            py: 1.3,

                            mb: 3,

                            boxShadow: "none",

                            "&:hover": {
                                bgcolor: "#3367D6",
                                boxShadow: "none",
                            },
                        }}
                    >
                        Đăng nhập bằng Google
                    </Button>

                    {/* Form */}

                    <Stack
                        spacing={2.5}
                        component="form"
                        noValidate
                    >
                        {/* Email */}

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: NAVY,
                                    mb: 1,
                                }}
                            >
                                Email
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="Email"
                                type="email"
                                size="medium"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlinedIcon
                                                sx={{
                                                    color: GREEN,
                                                    fontSize: 20,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        {/* Password */}

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: NAVY,
                                    mb: 1,
                                }}
                            >
                                Mật khẩu
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="Mật khẩu"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon
                                                sx={{
                                                    color: "#98A2B3",
                                                    fontSize: 20,
                                                }}
                                            />
                                        </InputAdornment>
                                    ),

                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                type="button"
                                                edge="end"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev
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
                                }}
                            />

                            {/* Forgot password */}

                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                sx={{
                                    mt: 1,
                                }}
                            >
                                <Link
                                    href="#"
                                    underline="hover"
                                    sx={{
                                        fontSize: 13,
                                        color: GREEN,
                                        fontWeight: 600,
                                    }}
                                >
                                    Quên mật khẩu
                                </Link>
                            </Stack>
                        </Box>

                        {/* Login button */}

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                bgcolor: GREEN,
                                color: "#fff",

                                textTransform: "none",

                                fontWeight: 700,

                                fontSize: 15,

                                py: 1.4,

                                borderRadius: 2,

                                boxShadow: "none",

                                "&:hover": {
                                    bgcolor: GREEN_DARK,
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Stack>

                    {/* Register */}

                    <Typography
                        sx={{
                            mt: 3,
                            fontSize: 14,
                            color: "#344054",
                            textAlign: "center",
                        }}
                    >
                        Chưa có tài khoản?{" "}
                        <Link
                            href="#"
                            underline="hover"
                            sx={{
                                color: GREEN,
                                fontWeight: 700,
                            }}
                        >
                            Đăng ký ngay
                        </Link>
                    </Typography>

                    {/* Candidate login */}

                    <Typography
                        sx={{
                            mt: 2,
                            fontSize: 13,
                            color: "#98A2B3",
                            textAlign: "center",
                        }}
                    >
                        Bạn là ứng viên?{" "}
                        <Link
                            href="/login"
                            underline="hover"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Đăng nhập tại đây
                        </Link>
                    </Typography>

                    {/* Mobile copyright */}

                    <Typography
                        sx={{
                            display: {
                                xs: "block",
                                md: "none",
                            },

                            mt: 4,

                            fontSize: 12,

                            color: GREEN,

                            textAlign: "center",
                        }}
                    >
                        © 2014-{new Date().getFullYear()} TopCV
                        Vietnam JSC. All rights reserved.
                    </Typography>
                </Box>
            </Box>

            {/* =========================
          RIGHT PANEL
      ========================= */}

            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },

                    width: {
                        md: "33.3333%",
                        lg: "33.3333%",
                    },

                    minHeight: "100vh",

                    bgcolor: PANEL_BG,

                    flexDirection: "column",
                    justifyContent: "space-between",

                    boxSizing: "border-box",

                    p: {
                        md: 4,
                        lg: 5,
                    },

                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Heading */}

                <Typography
                    sx={{
                        fontFamily: "Sora, sans-serif",

                        fontWeight: 800,

                        color: "#fff",

                        fontSize: {
                            md: 22,
                            lg: 28,
                        },

                        lineHeight: 1.4,

                        maxWidth: 420,
                    }}
                >
                    Theo dõi hiệu quả tuyển dụng với{" "}
                    <Box
                        component="span"
                        sx={{
                            color: GREEN,
                        }}
                    >
                        Báo cáo
                    </Box>
                </Typography>

                {/* Illustration */}

                <AnalyticsIllustration/>

                {/* Bottom */}

                <Stack
                    alignItems="center"
                    spacing={2}
                >
                    {/* Slider dots */}

                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        {[0, 1, 2].map((index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: 7,
                                    height: 7,
                                    borderRadius: "50%",

                                    bgcolor:
                                        index === 0
                                            ? GREEN
                                            : "rgba(255,255,255,0.3)",
                                }}
                            />
                        ))}
                    </Stack>

                    {/* Logo */}

                    <TopCvLogo
                        size={22}
                        light
                    />

                    {/* Slogan */}

                    <Typography
                        sx={{
                            fontSize: 12,
                            color:
                                "rgba(255,255,255,0.6)",
                        }}
                    >
                        Tiếp lợi thế, nối thành công
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}