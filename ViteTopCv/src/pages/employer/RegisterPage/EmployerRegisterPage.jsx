import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
import BusinessIcon from "@mui/icons-material/Business";
import EastIcon from "@mui/icons-material/East";

import styles from "./EmployerRegisterPage.module.css";

import {registerEmployer} from "../../../services/employerService.js";

const INITIAL_FORM = {
    tax_code: "",
    company_name: "",
    international_name: "",
    short_name: "",
    director: "",
    headquarters_address: "",
    email: "",
    phone_number: "",
    website: "",
    password: "",
    confirmPassword: "",
};

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
                style={{fontSize: size * 0.32}}
            >
                ●
            </Box>
        </Typography>
    );
}

export default function EmployerRegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    /* =========================
       CHANGE INPUT
    ========================= */

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setServerError("");
    };

    /* =========================
       VALIDATE
    ========================= */

    const validateForm = () => {
        const newErrors = {};

        if (!formData.tax_code.trim()) {
            newErrors.tax_code =
                "Vui lòng nhập mã số thuế";
        }

        if (!formData.company_name.trim()) {
            newErrors.company_name =
                "Vui lòng nhập tên công ty";
        }

        if (!formData.short_name.trim()) {
            newErrors.short_name =
                "Vui lòng nhập tên viết tắt";
        }

        if (!formData.director.trim()) {
            newErrors.director =
                "Vui lòng nhập người đại diện";
        }

        if (!formData.headquarters_address.trim()) {
            newErrors.headquarters_address =
                "Vui lòng nhập địa chỉ trụ sở";
        }

        if (!formData.email.trim()) {
            newErrors.email =
                "Vui lòng nhập email";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email.trim()
            )
        ) {
            newErrors.email =
                "Email không hợp lệ";
        }

        if (!formData.phone_number.trim()) {
            newErrors.phone_number =
                "Vui lòng nhập số điện thoại";
        }

        if (!formData.password) {
            newErrors.password =
                "Vui lòng nhập mật khẩu";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Mật khẩu phải có ít nhất 8 ký tự";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword =
                "Vui lòng xác nhận mật khẩu";
        } else if (
            formData.password !==
            formData.confirmPassword
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

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload = {
            tax_code: formData.tax_code.trim(),

            company_name:
                formData.company_name.trim(),

            international_name:
                formData.international_name.trim() || null,

            short_name:
                formData.short_name.trim(),

            director:
                formData.director.trim(),

            headquarters_address:
                formData.headquarters_address.trim(),

            email:
                formData.email.trim(),

            phone_number:
                formData.phone_number.trim(),

            website:
                formData.website.trim() || null,

            password:
            formData.password,
        };

        try {
            setLoading(true);

            setServerError("");

            console.log(
                "REGISTER COMPANY PAYLOAD:",
                payload
            );

            const data =
                await registerEmployer(payload);
            localStorage.setItem(
                "company_name",
                formData.company_name.trim()
            );

            console.log(
                "REGISTER COMPANY SUCCESS:",
                data
            );

            navigate("/employer/login", {
                replace: true,

                state: {
                    registerSuccess: true,
                    email: formData.email.trim(),
                },
            });
        } catch (error) {
            console.error(
                "REGISTER COMPANY ERROR:",
                error.response?.data || error
            );

            const detail =
                error.response?.data?.detail;

            if (typeof detail === "string") {
                setServerError(detail);
            } else if (Array.isArray(detail)) {
                setServerError(
                    detail
                        .map((item) => item.msg)
                        .join(", ")
                );
            } else {
                setServerError(
                    "Đăng ký tài khoản nhà tuyển dụng thất bại"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        navigate("/employer/login");
    };

    return (
        <Box className={styles.page}>
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
                    <TopCvLogo size={32}/>

                    <Box className={styles.employerBadge}>
                        <BusinessIcon fontSize="small"/>

                        <Typography>
                            Dành cho nhà tuyển dụng
                        </Typography>
                    </Box>

                    <Typography className={styles.title}>
                        Đăng ký tài khoản nhà tuyển dụng
                    </Typography>

                    <Typography className={styles.description}>
                        Tạo tài khoản doanh nghiệp để đăng tin tuyển
                        dụng và tìm kiếm ứng viên phù hợp.
                    </Typography>
                </Stack>

                <Stack
                    component="form"
                    noValidate
                    onSubmit={handleRegister}
                    spacing={3}
                >
                    {/* =========================
              COMPANY
          ========================= */}

                    <Box>
                        <Typography className={styles.sectionTitle}>
                            Thông tin doanh nghiệp
                        </Typography>

                        <Divider className={styles.sectionDivider}/>

                        <Box className={styles.formGrid}>
                            <Box>
                                <Typography className={styles.formLabel}>
                                    Mã số thuế
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="tax_code"
                                    placeholder="Nhập mã số thuế"
                                    value={formData.tax_code}
                                    onChange={handleChange}
                                    error={Boolean(errors.tax_code)}
                                    helperText={errors.tax_code}
                                    className={styles.input}
                                />
                            </Box>

                            <Box>
                                <Typography className={styles.formLabel}>
                                    Tên công ty
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="company_name"
                                    placeholder="Nhập tên công ty"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    error={Boolean(errors.company_name)}
                                    helperText={errors.company_name}
                                    className={styles.input}
                                />
                            </Box>

                            <Box>
                                <Typography className={styles.formLabel}>
                                    Tên quốc tế
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="international_name"
                                    placeholder="Nhập tên quốc tế"
                                    value={formData.international_name}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </Box>

                            <Box>
                                <Typography className={styles.formLabel}>
                                    Tên viết tắt
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="short_name"
                                    placeholder="Ví dụ: ABC Corp"
                                    value={formData.short_name}
                                    onChange={handleChange}
                                    error={Boolean(errors.short_name)}
                                    helperText={errors.short_name}
                                    className={styles.input}
                                />
                            </Box>

                            <Box className={styles.fullWidth}>
                                <Typography className={styles.formLabel}>
                                    Người đại diện / Giám đốc
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="director"
                                    placeholder="Nhập tên người đại diện"
                                    value={formData.director}
                                    onChange={handleChange}
                                    error={Boolean(errors.director)}
                                    helperText={errors.director}
                                    className={styles.input}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* =========================
              CONTACT
          ========================= */}

                    <Box>
                        <Typography className={styles.sectionTitle}>
                            Thông tin liên hệ
                        </Typography>

                        <Divider className={styles.sectionDivider}/>

                        <Box className={styles.formGrid}>
                            <Box className={styles.fullWidth}>
                                <Typography className={styles.formLabel}>
                                    Địa chỉ trụ sở
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="headquarters_address"
                                    placeholder="Nhập địa chỉ trụ sở chính"
                                    value={formData.headquarters_address}
                                    onChange={handleChange}
                                    error={Boolean(
                                        errors.headquarters_address
                                    )}
                                    helperText={
                                        errors.headquarters_address
                                    }
                                    className={styles.input}
                                />
                            </Box>

                            <Box>
                                <Typography className={styles.formLabel}>
                                    Email
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="email"
                                    type="email"
                                    placeholder="company@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                    className={styles.input}
                                />
                            </Box>

                            <Box>
                                <Typography className={styles.formLabel}>
                                    Số điện thoại
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="phone_number"
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    error={Boolean(errors.phone_number)}
                                    helperText={errors.phone_number}
                                    className={styles.input}
                                />
                            </Box>

                            <Box className={styles.fullWidth}>
                                <Typography className={styles.formLabel}>
                                    Website
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="website"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* =========================
              ACCOUNT
          ========================= */}

                    <Box>
                        <Typography className={styles.sectionTitle}>
                            Thông tin tài khoản
                        </Typography>

                        <Divider className={styles.sectionDivider}/>

                        <Box className={styles.formGrid}>
                            <Box>
                                <Typography className={styles.formLabel}>
                                    Mật khẩu
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="password"
                                    type={
                                        showPassword ? "text" : "password"
                                    }
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
                            </Box>

                            <Box>
                                <Typography className={styles.formLabel}>
                                    Xác nhận mật khẩu
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={Boolean(
                                        errors.confirmPassword
                                    )}
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
                        </Box>
                    </Box>

                    {/* SERVER ERROR */}

                    {serverError && (
                        <Typography className={styles.serverError}>
                            {serverError}
                        </Typography>
                    )}

                    {/* SUBMIT */}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        endIcon={!loading ? <EastIcon/> : undefined}
                        className={styles.registerButton}
                        disabled={loading}
                    >
                        {loading
                            ? "Đang đăng ký..."
                            : "Đăng ký tài khoản"}
                    </Button>
                </Stack>

                <Typography className={styles.loginText}>
                    Bạn đã có tài khoản nhà tuyển dụng?{" "}
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
            </Paper>
        </Box>
    );
}