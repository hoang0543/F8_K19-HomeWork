import { useState } from "react";
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

// ---- Màu thương hiệu TopCV: xanh lá làm chủ đạo ----
const GREEN = "#00B14F";
const GREEN_DARK = "#008C40";
const NAVY = "#18191C";

// Logo dạng chữ "topcv" — nửa đầu tối màu, nửa sau xanh lá
function TopCvLogo({ size = 34 }) {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: "Sora, sans-serif",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: -0.5,
      }}
    >
      <Box component="span" sx={{ color: NAVY }}>
        top
      </Box>
      <Box component="span" sx={{ color: GREEN }}>
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

// Icon Google nhiều màu (vẽ tay bằng SVG, không phụ thuộc icon pack)
function GoogleG({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
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

// Hoạ tiết mũi tên chấm bo, đặt góc dưới trái — chỉ hiện từ sm trở lên
function DotArrow() {
  const dots = [];
  const lineCount = 6;
  const dotsPerLine = 14;
  for (let l = 0; l < lineCount; l++) {
    for (let d = 0; d < dotsPerLine; d++) {
      dots.push(
        <circle
          key={`${l}-${d}`}
          cx={d * 14}
          cy={l * 14}
          r={2.5}
          fill={GREEN}
          opacity={0.9 - l * 0.1}
        />
      );
    }
  }
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
        position: "fixed",
        left: -40,
        bottom: -20,
        transform: "rotate(-45deg)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg width={dotsPerLine * 14} height={lineCount * 14}>
        {dots}
      </svg>
    </Box>
  );
}

export default function CandidateLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        bgcolor: "#F7F8FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <DotArrow />

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 620,
          borderRadius: { xs: 2, sm: 3 },
          p: { xs: 3, sm: 5 },
          zIndex: 1,
          boxShadow: "0 4px 24px rgba(16,24,40,0.06)",
        }}
      >
        <Stack alignItems="center" spacing={1} sx={{ mb: { xs: 3, sm: 4 } }}>
          <TopCvLogo size={30} />
          <Typography
            sx={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 700,
              fontSize: { xs: 18, sm: 20 },
              color: NAVY,
              mt: 1,
            }}
          >
            Chào mừng quay trở lại
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleG />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "#344054",
              borderColor: "#D0D5DD",
              borderRadius: 2,
              py: 1.2,
              fontSize: { xs: 14, sm: 15 },
            }}
          >
            Đăng nhập bằng Google
          </Button>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "#344054",
                borderColor: "#D0D5DD",
                borderRadius: 2,
                py: 1.2,
                fontSize: { xs: 14, sm: 15 },
              }}
            >
              Facebook
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LinkedInIcon sx={{ color: "#0A66C2" }} />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "#344054",
                borderColor: "#D0D5DD",
                borderRadius: 2,
                py: 1.2,
                fontSize: { xs: 14, sm: 15 },
              }}
            >
              Linkedin
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ my: { xs: 3, sm: 4 }, fontSize: 13, color: "#98A2B3" }}>
          Hoặc đăng nhập bằng email
        </Divider>

        <Stack spacing={2.5} component="form" noValidate>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 14, color: NAVY, mb: 1 }}>
              Email
            </Typography>
            <TextField fullWidth placeholder="Nhập email" size="medium" />
          </Box>

          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 14, color: NAVY }}>
                Password
              </Typography>
              <Link href="#" underline="hover" sx={{ fontSize: 13, color: GREEN, fontWeight: 600 }}>
                Quên mật khẩu
              </Link>
            </Stack>
            <TextField
              fullWidth
              placeholder="Nhập mật khẩu"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            endIcon={<EastIcon />}
            sx={{
              bgcolor: GREEN,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 15,
              py: 1.4,
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": { bgcolor: GREEN_DARK, boxShadow: "none" },
            }}
          >
            Đăng nhập
          </Button>
        </Stack>

        <Typography sx={{ mt: 3, fontSize: 14, color: "#475467", textAlign: "center" }}>
          Bạn chưa có tài khoản?{" "}
          <Link href="#" underline="hover" sx={{ color: GREEN, fontWeight: 700 }}>
            Đăng ký ngay
          </Link>
        </Typography>

        <Box
          sx={{
            mt: 3,
            bgcolor: "#F2FBF6",
            borderRadius: 2,
            p: 1.5,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 12.5, color: "#475467" }}>
            Bạn gặp khó khăn khi tạo tài khoản? Vui lòng gọi tới số{" "}
            <Box component="span" sx={{ color: GREEN, fontWeight: 700 }}>
              1900 068 889
            </Box>{" "}
            | Nhánh 2 (giờ hành chính).
          </Typography>
        </Box>

        <Typography sx={{ mt: 2, fontSize: 13, color: "#98A2B3", textAlign: "center" }}>
          Bạn là nhà tuyển dụng?{" "}
          <Link href="/employer/login" underline="hover" sx={{ fontWeight: 600 }}>
            Đăng nhập tại đây
          </Link>
        </Typography>
      </Paper>

      <Typography
        sx={{
          position: "fixed",
          bottom: 12,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 12,
          color: "#98A2B3",
          zIndex: 1,
        }}
      >
        © {new Date().getFullYear()}. All Rights Reserved. Đồ án clone giao diện.
      </Typography>
    </Box>
  );
}