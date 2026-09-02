import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
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
import EastIcon from "@mui/icons-material/East";

import styles from "./CandidateRegisterPage.module.css";

/* =========================
   LOGO
========================= */

function TopCvLogo({ size = 34 }) {
  return (
    <Typography
      component="span"
      className={styles.logo}
      style={{ fontSize: size }}
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
        style={{ fontSize: size * 0.32 }}
      >
        ●
      </Box>
    </Typography>
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
   REGISTER PAGE
========================= */

export default function CandidateRegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================
     VALIDATE
  ========================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Vui lòng nhập họ và tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Vui lòng xác nhận mật khẩu";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     REGISTER
  ========================= */

  const handleRegister = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    /*
      Payload gửi cho Backend.

      confirmPassword KHÔNG gửi lên BE.
    */

    const payload = {
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
    };

    console.log("Register payload:", payload);

    /*
      Sau này gọi API ở đây:

      await registerCandidate(payload);
    */
  };

  /* =========================
     LOGIN
  ========================= */

  const handleLogin = () => {
    navigate("/candidate/login");
  };

  return (
    <Box className={styles.page}>
      <DotArrow />

      <Paper
        elevation={0}
        className={styles.card}
      >
        {/* HEADER */}

        <Stack
          alignItems="center"
          spacing={1}
          className={styles.header}
        >
          <TopCvLogo size={30} />

          <Typography className={styles.title}>
            Đăng ký tài khoản ứng viên
          </Typography>

          <Typography className={styles.description}>
            Tạo tài khoản để tìm kiếm và ứng tuyển công việc
            phù hợp với bạn.
          </Typography>
        </Stack>

        {/* FORM */}

        <Stack
          component="form"
          spacing={2.2}
          noValidate
          onSubmit={handleRegister}
        >
          {/* FULL NAME */}

          <Box>
            <Typography className={styles.formLabel}>
              Họ và tên
            </Typography>

            <TextField
              fullWidth
              name="full_name"
              placeholder="Nhập họ và tên"
              value={formData.full_name}
              onChange={handleChange}
              error={Boolean(errors.full_name)}
              helperText={errors.full_name}
              className={styles.input}
            />
          </Box>

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
              error={Boolean(errors.email)}
              helperText={errors.email}
              className={styles.input}
            />
          </Box>

          {/* PASSWORD */}

          <Box>
            <Typography className={styles.formLabel}>
              Mật khẩu
            </Typography>

            <TextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              className={styles.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      edge="end"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* CONFIRM PASSWORD */}

          <Box>
            <Typography className={styles.formLabel}>
              Xác nhận mật khẩu
            </Typography>

            <TextField
              fullWidth
              name="confirmPassword"
              type={
                showConfirmPassword ? "text" : "password"
              }
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              className={styles.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      edge="end"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* REGISTER BUTTON */}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            endIcon={<EastIcon />}
            className={styles.registerButton}
          >
            Đăng ký
          </Button>
        </Stack>

        {/* LOGIN */}

        <Typography className={styles.loginText}>
          Bạn đã có tài khoản?{" "}
          <Link
            component="button"
            type="button"
            underline="hover"
            className={styles.loginLink}
            onClick={handleLogin}
          >
            Đăng nhập ngay
          </Link>
        </Typography>

        {/* TERMS */}

        <Typography className={styles.terms}>
          Bằng việc đăng ký tài khoản, bạn đồng ý với Điều khoản
          dịch vụ và Chính sách bảo mật của chúng tôi.
        </Typography>
      </Paper>
    </Box>
  );
}