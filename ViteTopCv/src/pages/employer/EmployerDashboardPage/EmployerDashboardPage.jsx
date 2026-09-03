import { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";

import Header from "../../../components/Header/Header.jsx";

import {
    getCurrentEmployerCompany,
} from "../../../services/employerService.js";

import styles from "./EmployerDashboardPage.module.css";

export default function EmployerDashboardPage() {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    // Lấy user đã lưu sau khi login
    const savedUser = localStorage.getItem("user");

    let user = null;

    try {
        user = savedUser
            ? JSON.parse(savedUser)
            : null;
    } catch {
        user = null;
    }

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const data =
                    await getCurrentEmployerCompany();

                console.log(
                    "CURRENT EMPLOYER COMPANY:",
                    data
                );

                setCompany(data);
            } catch (error) {
                console.error(
                    "GET COMPANY ERROR:",
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, []);

    return (
        <Box className={styles.page}>
            <Header
                mode="employer"
                companyName={company?.company_name || ""}
            />

            <Box className={styles.main}>
                <Typography className={styles.title}>
                    Xin chào,{" "}
                    {loading
                        ? "Đang tải..."
                        : company?.company_name ||
                          "Nhà tuyển dụng"}{" "}
                    👋
                </Typography>

                <Typography className={styles.description}>
                    Quản lý thông tin doanh nghiệp và hoạt động
                    tuyển dụng của bạn.
                </Typography>

                <Paper
                    elevation={0}
                    className={styles.companyCard}
                >
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <Box className={styles.companyIcon}>
                                <BusinessOutlinedIcon />
                            </Box>

                            <Box>
                                <Typography className={styles.label}>
                                    Tên doanh nghiệp
                                </Typography>

                                <Typography className={styles.value}>
                                    {loading
                                        ? "Đang tải..."
                                        : company?.company_name ||
                                          "Chưa cập nhật"}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <Box className={styles.companyIcon}>
                                <EmailOutlinedIcon />
                            </Box>

                            <Box>
                                <Typography className={styles.label}>
                                    Email
                                </Typography>

                                <Typography className={styles.value}>
                                    {company?.email ||
                                        user?.email ||
                                        "Chưa cập nhật"}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <Box className={styles.companyIcon}>
                                <ApartmentOutlinedIcon />
                            </Box>

                            <Box>
                                <Typography className={styles.label}>
                                    Loại tài khoản
                                </Typography>

                                <Typography className={styles.value}>
                                    Nhà tuyển dụng
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}