import {
    Box,
    Button,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import ArrowBackIcon
    from "@mui/icons-material/ArrowBack";

import BusinessOutlinedIcon
    from "@mui/icons-material/BusinessOutlined";

import EmailOutlinedIcon
    from "@mui/icons-material/EmailOutlined";

import PhoneOutlinedIcon
    from "@mui/icons-material/PhoneOutlined";

import LanguageOutlinedIcon
    from "@mui/icons-material/LanguageOutlined";

import LocationOnOutlinedIcon
    from "@mui/icons-material/LocationOnOutlined";

import BadgeOutlinedIcon
    from "@mui/icons-material/BadgeOutlined";

import styles
    from "./CompanyDetailPage.module.css";


/* =========================
   INFO ROW
========================= */

function InfoItem({
    label,
    value,
    icon: Icon,
    fullWidth = false,
}) {
    return (
        <Box
            className={
                fullWidth
                    ? `${styles.infoItem} ${styles.fullWidth}`
                    : styles.infoItem
            }
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                className={
                    styles.infoLabelArea
                }
            >
                {Icon && (
                    <Icon
                        className={
                            styles.infoIcon
                        }
                    />
                )}

                <Typography
                    className={
                        styles.infoLabel
                    }
                >
                    {label}
                </Typography>
            </Stack>

            <Typography
                className={
                    styles.infoValue
                }
            >
                {value || "-"}
            </Typography>
        </Box>
    );
}


/* =========================
   STATUS
========================= */

const getStatus = (status) => {
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

export default function CompanyDetailPage() {
    const navigate =
        useNavigate();

    const location =
        useLocation();

    const company =
        location.state?.company;


    /* =========================
       NO DATA
    ========================= */

    if (!company) {
        return (
            <Box
                className={
                    styles.notFoundPage
                }
            >
                <BusinessOutlinedIcon
                    className={
                        styles.notFoundIcon
                    }
                />

                <Typography
                    className={
                        styles.notFoundTitle
                    }
                >
                    Không tìm thấy thông tin công ty
                </Typography>

                <Typography
                    className={
                        styles.notFoundDescription
                    }
                >
                    Vui lòng quay lại danh sách
                    công ty và chọn lại.
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        navigate(
                            "/admin/companies"
                        )
                    }
                    className={
                        styles.backPrimaryButton
                    }
                >
                    Quay lại danh sách
                </Button>
            </Box>
        );
    }


    const status =
        getStatus(
            company.status
        );


    return (
        <Box className={styles.page}>
            {/* BACK */}

            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() =>
                    navigate(
                        "/admin/companies"
                    )
                }
                className={
                    styles.backButton
                }
            >
                Quay lại danh sách
            </Button>


            {/* COMPANY HEADER */}

            <Paper
                elevation={0}
                className={
                    styles.companyHeader
                }
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >
                        <Box
                            className={
                                styles.companyLogo
                            }
                        >
                            {company.logo_url ? (
                                <Box
                                    component="img"
                                    src={
                                        company.logo_url
                                    }
                                    alt={
                                        company.company_name
                                    }
                                    className={
                                        styles.logoImage
                                    }
                                />
                            ) : (
                                company.company_name
                                    ?.charAt(0)
                                    .toUpperCase() ||
                                "C"
                            )}
                        </Box>

                        <Box>
                            <Typography
                                className={
                                    styles.companyName
                                }
                            >
                                {company.company_name ||
                                    "Doanh nghiệp"}
                            </Typography>

                            <Typography
                                className={
                                    styles.shortName
                                }
                            >
                                {company.short_name ||
                                    company.international_name ||
                                    ""}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                className={
                                    styles.statusArea
                                }
                            >
                                <Chip
                                    size="small"
                                    label={
                                        status.label
                                    }
                                    color={
                                        status.color
                                    }
                                />

                                <Chip
                                    size="small"
                                    variant="outlined"
                                    label={
                                        company.verification_tier ||
                                        "UNVERIFIED"
                                    }
                                />
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Paper>


            {/* BASIC INFORMATION */}

            <Paper
                elevation={0}
                className={
                    styles.card
                }
            >
                <Typography
                    className={
                        styles.sectionTitle
                    }
                >
                    Thông tin doanh nghiệp
                </Typography>

                <Divider
                    className={
                        styles.divider
                    }
                />

                <Box
                    className={
                        styles.infoGrid
                    }
                >
                    <InfoItem
                        label="Mã số thuế"
                        value={
                            company.tax_code
                        }
                        icon={
                            BadgeOutlinedIcon
                        }
                    />

                    <InfoItem
                        label="Giám đốc"
                        value={
                            company.director
                        }
                        icon={
                            BadgeOutlinedIcon
                        }
                    />

                    <InfoItem
                        label="Tên công ty"
                        value={
                            company.company_name
                        }
                        icon={
                            BusinessOutlinedIcon
                        }
                        fullWidth
                    />

                    <InfoItem
                        label="Tên quốc tế"
                        value={
                            company.international_name
                        }
                        icon={
                            BusinessOutlinedIcon
                        }
                        fullWidth
                    />

                    <InfoItem
                        label="Tên viết tắt"
                        value={
                            company.short_name
                        }
                        icon={
                            BusinessOutlinedIcon
                        }
                    />

                    <InfoItem
                        label="Quy mô công ty"
                        value={
                            company.company_size
                        }
                        icon={
                            BusinessOutlinedIcon
                        }
                    />
                </Box>
            </Paper>


            {/* CONTACT */}

            <Paper
                elevation={0}
                className={
                    styles.card
                }
            >
                <Typography
                    className={
                        styles.sectionTitle
                    }
                >
                    Thông tin liên hệ
                </Typography>

                <Divider
                    className={
                        styles.divider
                    }
                />

                <Box
                    className={
                        styles.infoGrid
                    }
                >
                    <InfoItem
                        label="Email"
                        value={
                            company.email
                        }
                        icon={
                            EmailOutlinedIcon
                        }
                    />

                    <InfoItem
                        label="Số điện thoại"
                        value={
                            company.phone_number
                        }
                        icon={
                            PhoneOutlinedIcon
                        }
                    />

                    <InfoItem
                        label="Website"
                        value={
                            company.website
                        }
                        icon={
                            LanguageOutlinedIcon
                        }
                        fullWidth
                    />

                    <InfoItem
                        label="Địa chỉ trụ sở"
                        value={
                            company.headquarters_address
                        }
                        icon={
                            LocationOnOutlinedIcon
                        }
                        fullWidth
                    />
                </Box>
            </Paper>


            {/* DESCRIPTION */}

            {company.description_html && (
                <Paper
                    elevation={0}
                    className={
                        styles.card
                    }
                >
                    <Typography
                        className={
                            styles.sectionTitle
                        }
                    >
                        Giới thiệu công ty
                    </Typography>

                    <Divider
                        className={
                            styles.divider
                        }
                    />

                    <Box
                        className={
                            styles.descriptionHtml
                        }
                        dangerouslySetInnerHTML={{
                            __html:
                                company.description_html,
                        }}
                    />
                </Paper>
            )}
        </Box>
    );
}