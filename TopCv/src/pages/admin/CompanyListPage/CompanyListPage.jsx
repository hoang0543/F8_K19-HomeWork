import {
    useEffect,
    useState,
} from "react";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Pagination,
} from "@mui/material";

import {
    useNavigate,
} from "react-router-dom";

import BusinessOutlinedIcon
    from "@mui/icons-material/BusinessOutlined";

import VisibilityOutlinedIcon
    from "@mui/icons-material/VisibilityOutlined";

import {
    getCompanies,
} from "../../../services/adminService.js";

import styles
    from "./CompanyListPage.module.css";


const PAGE_SIZE = 10;


/* =========================
   STATUS
========================= */

const getStatusConfig = (status) => {
    switch (status) {
        case "APPROVED":
            return {
                label: "Đã duyệt",
                color: "success",
            };

        case "PENDING":
            return {
                label: "Chờ duyệt",
                color: "warning",
            };

        case "REJECTED":
            return {
                label: "Từ chối",
                color: "error",
            };

        default:
            return {
                label:
                    status ||
                    "Không xác định",
                color: "default",
            };
    }
};


/* =========================
   PAGE
========================= */

export default function CompanyListPage() {
    const navigate =
        useNavigate();

    const [companies, setCompanies] =
        useState([]);

    const [page, setPage] =
        useState(1);

    const [total, setTotal] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /* =========================
       FETCH
    ========================= */

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await getCompanies(page);

                console.log(
                    "ADMIN COMPANY LIST:",
                    response
                );

                setCompanies(
                    Array.isArray(response?.data)
                        ? response.data
                        : []
                );

                setTotal(
                    response?.total || 0
                );
            } catch (error) {
                console.error(
                    "GET COMPANIES ERROR:",
                    error.response?.data ||
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Không thể tải danh sách công ty."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCompanies();
    }, [page]);


    /* =========================
       DETAIL
    ========================= */

    const handleViewDetail = (
        company
    ) => {
        navigate(
            `/admin/companies/${company.id}`,
            {
                state: {
                    company,
                },
            }
        );
    };


    /* =========================
       PAGINATION
    ========================= */

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total / PAGE_SIZE
            )
        );


    return (
        <Box className={styles.page}>
            {/* HEADER */}

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className={styles.pageHeader}
            >
                <Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.2}
                    >
                        <BusinessOutlinedIcon
                            className={
                                styles.titleIcon
                            }
                        />

                        <Typography
                            className={
                                styles.title
                            }
                        >
                            Danh sách công ty
                        </Typography>
                    </Stack>

                    <Typography
                        className={
                            styles.description
                        }
                    >
                        Quản lý thông tin các công ty
                        và nhà tuyển dụng đã đăng ký
                        trên hệ thống TopCV.
                    </Typography>
                </Box>

                <Box
                    className={
                        styles.totalBox
                    }
                >
                    <Typography
                        className={
                            styles.totalNumber
                        }
                    >
                        {total}
                    </Typography>

                    <Typography
                        className={
                            styles.totalLabel
                        }
                    >
                        Công ty
                    </Typography>
                </Box>
            </Stack>


            {/* CONTENT */}

            <Paper
                elevation={0}
                className={
                    styles.tableCard
                }
            >
                {loading ? (
                    <Box
                        className={
                            styles.loading
                        }
                    >
                        <CircularProgress />

                        <Typography>
                            Đang tải danh sách
                            công ty...
                        </Typography>
                    </Box>
                ) : error ? (
                    <Box
                        className={
                            styles.errorBox
                        }
                    >
                        <Typography
                            className={
                                styles.errorText
                            }
                        >
                            {error}
                        </Typography>
                    </Box>
                ) : companies.length === 0 ? (
                    <Box
                        className={
                            styles.empty
                        }
                    >
                        <BusinessOutlinedIcon
                            className={
                                styles.emptyIcon
                            }
                        />

                        <Typography>
                            Chưa có công ty nào.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Công ty
                                        </TableCell>

                                        <TableCell>
                                            Mã số thuế
                                        </TableCell>

                                        <TableCell>
                                            Giám đốc
                                        </TableCell>

                                        <TableCell>
                                            Email
                                        </TableCell>

                                        <TableCell>
                                            Số điện thoại
                                        </TableCell>

                                        <TableCell>
                                            Trạng thái
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                        >
                                            Thao tác
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {companies.map(
                                        (company) => {
                                            const status =
                                                getStatusConfig(
                                                    company.status
                                                );

                                            return (
                                                <TableRow
                                                    key={
                                                        company.id
                                                    }
                                                    hover
                                                >
                                                    {/* COMPANY */}

                                                    <TableCell>
                                                        <Stack
                                                            direction="row"
                                                            spacing={1.5}
                                                            alignItems="center"
                                                        >
                                                            <Box
                                                                className={
                                                                    styles.companyAvatar
                                                                }
                                                            >
                                                                {company.company_name
                                                                    ?.charAt(
                                                                        0
                                                                    )
                                                                    .toUpperCase() ||
                                                                    "C"}
                                                            </Box>

                                                            <Box
                                                                className={
                                                                    styles.companyText
                                                                }
                                                            >
                                                                <Typography
                                                                    className={
                                                                        styles.companyName
                                                                    }
                                                                    title={
                                                                        company.company_name
                                                                    }
                                                                >
                                                                    {company.company_name ||
                                                                        "-"}
                                                                </Typography>

                                                                <Typography
                                                                    className={
                                                                        styles.shortName
                                                                    }
                                                                >
                                                                    {company.short_name ||
                                                                        company.international_name ||
                                                                        "-"}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </TableCell>

                                                    {/* TAX */}

                                                    <TableCell>
                                                        {company.tax_code ||
                                                            "-"}
                                                    </TableCell>

                                                    {/* DIRECTOR */}

                                                    <TableCell>
                                                        {company.director ||
                                                            "-"}
                                                    </TableCell>

                                                    {/* EMAIL */}

                                                    <TableCell>
                                                        {company.email ||
                                                            "-"}
                                                    </TableCell>

                                                    {/* PHONE */}

                                                    <TableCell>
                                                        {company.phone_number ||
                                                            "-"}
                                                    </TableCell>

                                                    {/* STATUS */}

                                                    <TableCell>
                                                        <Chip
                                                            size="small"
                                                            label={
                                                                status.label
                                                            }
                                                            color={
                                                                status.color
                                                            }
                                                            className={
                                                                styles.statusChip
                                                            }
                                                        />
                                                    </TableCell>

                                                    {/* ACTION */}

                                                    <TableCell
                                                        align="center"
                                                    >
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            startIcon={
                                                                <VisibilityOutlinedIcon />
                                                            }
                                                            className={
                                                                styles.detailButton
                                                            }
                                                            onClick={() =>
                                                                handleViewDetail(
                                                                    company
                                                                )
                                                            }
                                                        >
                                                            Chi tiết
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>


                        {/* PAGINATION */}

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className={
                                styles.paginationArea
                            }
                        >
                            <Typography
                                className={
                                    styles.paginationText
                                }
                            >
                                Tổng cộng {total} công ty
                            </Typography>

                            <Pagination
                                page={page}
                                count={totalPages}
                                onChange={(
                                    _,
                                    value
                                ) =>
                                    setPage(
                                        value
                                    )
                                }
                                shape="rounded"
                            />
                        </Stack>
                    </>
                )}
            </Paper>
        </Box>
    );
}