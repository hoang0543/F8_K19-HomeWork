import {
    useEffect,
    useState,
} from "react";

import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Header from "../../../components/header/Header.jsx";
import HeroSearch from "../../../components/search/HeroSearch.jsx";

import {getJobBySlug, applyJob} from "../../../services/candidateService.js";

import styles from "./JobDetailPage.module.css";

/* =========================================================
   HELPERS
========================================================= */

function formatMoney(value) {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(value);
}

function formatSalary(salary) {
    if (!salary) {
        return "Thỏa thuận";
    }

    if (salary.is_negotiable) {
        return "Thỏa thuận";
    }

    const currency =
        salary.currency || "VND";

    if (
        salary.type === "RANGE" &&
        salary.min !== null &&
        salary.min !== undefined &&
        salary.max !== null &&
        salary.max !== undefined
    ) {
        if (currency === "VND") {
            const min =
                salary.min / 1_000_000;

            const max =
                salary.max / 1_000_000;

            return `${min} - ${max} triệu`;
        }

        return `${formatMoney(
            salary.min
        )} - ${formatMoney(
            salary.max
        )} ${currency}`;
    }

    if (
        salary.min !== null &&
        salary.min !== undefined
    ) {
        return `Từ ${formatMoney(
            salary.min
        )} ${currency}`;
    }

    if (
        salary.max !== null &&
        salary.max !== undefined
    ) {
        return `Đến ${formatMoney(
            salary.max
        )} ${currency}`;
    }

    return "Thỏa thuận";
}

function formatDeadline(deadline) {
    if (!deadline) {
        return "Chưa cập nhật";
    }

    const date = new Date(deadline);

    if (Number.isNaN(date.getTime())) {
        return "Chưa cập nhật";
    }

    return new Intl.DateTimeFormat(
        "vi-VN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }
    ).format(date);
}

function formatGender(gender) {
    const genderMap = {
        MALE: "Nam",
        FEMALE: "Nữ",
        OTHER: "Không yêu cầu",
    };

    return (
        genderMap[gender] ||
        "Không yêu cầu"
    );
}

function formatJobType(jobType) {
    const jobTypeMap = {
        FULL_TIME: "Toàn thời gian",
        PART_TIME: "Bán thời gian",
        INTERN: "Thực tập",
        CONTRACT: "Hợp đồng",
        FREELANCE: "Freelance",
    };

    return (
        jobTypeMap[jobType] ||
        jobType ||
        "Chưa cập nhật"
    );
}

/* =========================================================
   BREADCRUMB
========================================================= */

function Breadcrumb({job}) {
    return (
        <Stack
            className={
                styles.breadcrumb
            }
            direction="row"
            alignItems="center"
        >
            <Typography>
                Trang chủ
            </Typography>

            <ChevronRightIcon/>

            <Typography>
                Việc làm
            </Typography>

            <ChevronRightIcon/>

            <Typography>
                {job.category ||
                    "Danh mục"}
            </Typography>

            <ChevronRightIcon/>

            <Typography
                className={
                    styles.breadcrumbCurrent
                }
            >
                {job.title}
            </Typography>
        </Stack>
    );
}

/* =========================================================
   INFO ITEM
========================================================= */

function JobInfoItem({
                         icon: Icon,
                         label,
                         value,
                     }) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            className={
                styles.jobInfoItem
            }
        >
            <Box
                className={
                    styles.jobInfoIcon
                }
            >
                <Icon/>
            </Box>

            <Box>
                <Typography
                    className={
                        styles.jobInfoLabel
                    }
                >
                    {label}
                </Typography>

                <Typography
                    className={
                        styles.jobInfoValue
                    }
                >
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}

/* =========================================================
   JOB HEADER
========================================================= */

function JobHeaderCard({job}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [saved, setSaved] =
        useState(false);

    const [applyOpen, setApplyOpen] =
        useState(false);

    const [applying, setApplying] =
        useState(false);

    const [applyError, setApplyError] =
        useState("");

    const [applySuccess, setApplySuccess] =
        useState("");

    const [cvId, setCvId] =
        useState("");

    const [
        coverLetter,
        setCoverLetter,
    ] = useState("");

    const jobLocation =
        job.work_location?.[0]
            ?.city_name ||
        "Chưa cập nhật";


    /* =========================
       OPEN APPLY
    ========================= */

    const handleApply = () => {
        const token =
            localStorage.getItem(
                "access_token"
            );

        const savedUser =
            localStorage.getItem(
                "user"
            );

        let user = null;

        try {
            user = savedUser
                ? JSON.parse(savedUser)
                : null;
        } catch {
            user = null;
        }

        /* =========================
           CHECK LOGIN
        ========================= */

        if (
            !token ||
            user?.role !== "CANDIDATE"
        ) {
            navigate(
                "/candidate/login",
                {
                    state: {
                        from:
                        location.pathname,
                    },
                }
            );

            return;
        }

        /* =========================
           GET LATEST CV ID
        ========================= */

        const savedCvId =
            localStorage.getItem(
                "latest_cv_id"
            );

        setApplySuccess("");
        setCoverLetter("");

        if (!savedCvId) {
            setCvId("");

            setApplyError(
                "Không tìm thấy CV của bạn. Vui lòng tạo CV trước khi ứng tuyển."
            );

            setApplyOpen(true);

            return;
        }

        /* =========================
           OPEN APPLY DIALOG
        ========================= */

        setCvId(savedCvId);

        setApplyError("");

        setApplyOpen(true);
    };

    /* =========================
       SUBMIT APPLY
    ========================= */

    const handleSubmitApply =
        async () => {
            const normalizedCvId =
                cvId.trim();

            if (!normalizedCvId) {
                setApplyError(
                    "Vui lòng nhập CV ID."
                );

                return;
            }

            try {
                setApplying(true);

                setApplyError("");
                setApplySuccess("");

                const payload = {
                    cv_id:
                    normalizedCvId,

                    cover_letter:
                        coverLetter.trim(),
                };

                console.log(
                    "APPLY JOB PAYLOAD:",
                    payload
                );

                const response =
                    await applyJob(
                        job.id,
                        payload
                    );

                console.log(
                    "APPLY JOB RESPONSE:",
                    response
                );

                setApplySuccess(
                    "Ứng tuyển thành công!"
                );

                setTimeout(() => {
                    setApplyOpen(false);
                    setApplySuccess("");
                }, 1200);
            } catch (error) {
                console.error(
                    "APPLY JOB ERROR:",
                    error.response?.data ||
                    error
                );

                const status =
                    error.response?.status;

                if (status === 401) {
                    localStorage.removeItem(
                        "access_token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    navigate(
                        "/candidate/login",
                        {
                            state: {
                                from:
                                location.pathname,
                            },
                        }
                    );

                    return;
                }

                if (status === 403) {
                    setApplyError(
                        "Tài khoản hiện tại không có quyền ứng tuyển."
                    );

                    return;
                }

                if (status === 404) {
                    setApplyError(
                        "Không tìm thấy công việc hoặc CV."
                    );

                    return;
                }

                if (status === 409) {
                    setApplyError(
                        "Bạn đã ứng tuyển công việc này."
                    );

                    return;
                }

                if (status === 422) {
                    setApplyError(
                        error.response
                            ?.data
                            ?.message ||
                        "Thông tin ứng tuyển không hợp lệ."
                    );

                    return;
                }

                setApplyError(
                    error.response
                        ?.data
                        ?.message ||
                    error.response
                        ?.data
                        ?.detail ||
                    "Không thể ứng tuyển. Vui lòng thử lại."
                );
            } finally {
                setApplying(false);
            }
        };


    return (
        <>
            <Box
                className={
                    styles.jobHeaderCard
                }
            >
                <Typography
                    className={
                        styles.jobTitle
                    }
                >
                    {job.title}
                </Typography>

                <Stack
                    direction="row"
                    alignItems="center"
                    className={
                        styles.salaryRow
                    }
                >
                    <Typography
                        className={
                            styles.salary
                        }
                    >
                        {formatSalary(
                            job.salary
                        )}
                    </Typography>

                    {job.is_hot && (
                        <Chip
                            label="HOT"
                            size="small"
                            className={
                                styles.hotChip
                            }
                        />
                    )}
                </Stack>


                {/* JOB INFO */}

                <Box
                    className={
                        styles.jobInfoGrid
                    }
                >
                    <JobInfoItem
                        icon={
                            LocationOnOutlinedIcon
                        }
                        label="Địa điểm"
                        value={
                            jobLocation
                        }
                    />

                    <JobInfoItem
                        icon={
                            WorkHistoryOutlinedIcon
                        }
                        label="Kinh nghiệm"
                        value={
                            job.experience_level ||
                            "Không yêu cầu"
                        }
                    />

                    <JobInfoItem
                        icon={
                            AccessTimeOutlinedIcon
                        }
                        label="Hạn ứng tuyển"
                        value={
                            formatDeadline(
                                job.deadline
                            )
                        }
                    />
                </Box>


                {/* ACTION */}

                <Stack
                    className={
                        styles.actionRow
                    }
                >
                    <Button
                        variant="contained"
                        startIcon={
                            <SendOutlinedIcon/>
                        }
                        className={
                            styles.applyButton
                        }
                        onClick={
                            handleApply
                        }
                    >
                        Ứng tuyển ngay
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={
                            <FavoriteBorderOutlinedIcon/>
                        }
                        className={
                            saved
                                ? `${styles.saveButton} ${styles.saveButtonActive}`
                                : styles.saveButton
                        }
                        onClick={() =>
                            setSaved(
                                (previous) =>
                                    !previous
                            )
                        }
                    >
                        {saved
                            ? "Đã lưu"
                            : "Lưu tin"}
                    </Button>
                </Stack>
            </Box>


            {/* =========================
          APPLY DIALOG
      ========================= */}

            <Dialog
                open={applyOpen}
                onClose={() => {
                    if (!applying) {
                        setApplyOpen(false);
                    }
                }}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    className:
                    styles.applyDialog,
                }}
            >
                <DialogTitle
                    className={
                        styles.applyDialogTitle
                    }
                >
                    Ứng tuyển{" "}
                    {job.title}
                </DialogTitle>

                <DialogContent>
                    <Stack
                        spacing={2}
                        className={
                            styles.applyForm
                        }
                    >
                        <Typography
                            className={
                                styles.applyDescription
                            }
                        >
                            Chọn CV của bạn và
                            viết một lời giới thiệu
                            ngắn cho nhà tuyển dụng.
                        </Typography>


                        {applyError && (
                            <Alert
                                severity="error"
                            >
                                {applyError}
                            </Alert>
                        )}

                        {!cvId && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setApplyOpen(false);

                                    navigate(
                                        "/candidate/cv/create"
                                    );
                                }}
                            >
                                Tạo CV ngay
                            </Button>
                        )}


                        {applySuccess && (
                            <Alert
                                severity="success"
                            >
                                {applySuccess}
                            </Alert>
                        )}


                        <TextField
                            fullWidth
                            label="CV ID"
                            placeholder="Nhập CV ID"
                            value={cvId}
                            onChange={(
                                event
                            ) =>
                                setCvId(
                                    event.target
                                        .value
                                )
                            }
                            disabled={
                                applying
                            }
                        />


                        <TextField
                            fullWidth
                            multiline
                            minRows={5}
                            label="Thư giới thiệu"
                            placeholder="Giới thiệu ngắn gọn về bản thân, kinh nghiệm và lý do bạn phù hợp với vị trí này..."
                            value={
                                coverLetter
                            }
                            onChange={(
                                event
                            ) =>
                                setCoverLetter(
                                    event.target
                                        .value
                                )
                            }
                            disabled={
                                applying
                            }
                        />
                    </Stack>
                </DialogContent>


                <DialogActions
                    className={
                        styles.applyDialogActions
                    }
                >
                    <Button
                        onClick={() =>
                            setApplyOpen(false)
                        }
                        disabled={
                            applying
                        }
                        className={
                            styles.cancelApplyButton
                        }
                    >
                        Hủy
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={
                            applying
                                ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                )
                                : (
                                    <SendOutlinedIcon/>
                                )
                        }
                        onClick={
                            handleSubmitApply
                        }
                        disabled={
                            applying
                        }
                        className={
                            styles.confirmApplyButton
                        }
                    >
                        {applying
                            ? "Đang ứng tuyển..."
                            : "Gửi hồ sơ"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

/* =========================================================
   COMPANY CARD
========================================================= */

function CompanyCard({
                         company,
                     }) {
    if (!company) {
        return null;
    }

    const handleOpenWebsite = () => {
        if (!company.website) {
            return;
        }

        const website =
            company.website.startsWith(
                "http"
            )
                ? company.website
                : `https://${company.website}`;

        window.open(
            website,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <Box
            className={
                styles.companyCard
            }
        >
            <Stack
                direction="row"
                alignItems="center"
                className={
                    styles.companyHeader
                }
            >
                {/* LOGO */}

                <Box
                    className={
                        styles.companyLogo
                    }
                >
                    {company.logo_url ? (
                        <img
                            src={
                                company.logo_url
                            }
                            alt={
                                company.company_name
                            }
                        />
                    ) : (
                        <BusinessOutlinedIcon/>
                    )}
                </Box>

                <Typography
                    className={
                        styles.companyName
                    }
                >
                    {company.company_name ||
                        "Chưa cập nhật"}
                </Typography>
            </Stack>

            {/* COMPANY INFO */}

            <Stack
                className={
                    styles.companyInfoList
                }
            >
                <Stack
                    direction="row"
                    className={
                        styles.companyInfoItem
                    }
                >
                    <PeopleAltOutlinedIcon/>

                    <Typography
                        className={
                            styles.companyInfoLabel
                        }
                    >
                        Quy mô:
                    </Typography>

                    <Typography
                        className={
                            styles.companyInfoValue
                        }
                    >
                        {company.company_size ||
                            "Chưa cập nhật"}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    className={
                        styles.companyInfoItem
                    }
                >
                    <BusinessOutlinedIcon/>

                    <Typography
                        className={
                            styles.companyInfoLabel
                        }
                    >
                        Lĩnh vực:
                    </Typography>

                    <Typography
                        className={
                            styles.companyInfoValue
                        }
                    >
                        {company.category ||
                            "Chưa cập nhật"}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    className={
                        styles.companyInfoItem
                    }
                >
                    <ApartmentOutlinedIcon/>

                    <Typography
                        className={
                            styles.companyInfoLabel
                        }
                    >
                        Địa điểm:
                    </Typography>

                    <Typography
                        className={
                            styles.companyInfoValue
                        }
                    >
                        {company.headquarters_address ||
                            "Chưa cập nhật"}
                    </Typography>
                </Stack>
            </Stack>

            {/* COMPANY PAGE */}

            <Button
                fullWidth
                variant="outlined"
                endIcon={
                    <OpenInNewOutlinedIcon/>
                }
                className={
                    styles.companyButton
                }
                disabled={
                    !company.website
                }
                onClick={
                    handleOpenWebsite
                }
            >
                Xem trang công ty
            </Button>
        </Box>
    );
}

/* =========================================================
   GENERAL INFO
========================================================= */

function GeneralInfoCard({
                             job,
                         }) {
    return (
        <Box
            className={
                styles.generalCard
            }
        >
            <Typography
                className={
                    styles.cardTitle
                }
            >
                Thông tin chung
            </Typography>

            <Stack
                className={
                    styles.generalList
                }
            >
                <JobInfoItem
                    icon={
                        WorkOutlineOutlinedIcon
                    }
                    label="Hình thức làm việc"
                    value={formatJobType(
                        job.job_type
                    )}
                />

                <JobInfoItem
                    icon={
                        SchoolOutlinedIcon
                    }
                    label="Kinh nghiệm"
                    value={
                        job.experience_level ||
                        "Không yêu cầu"
                    }
                />

                <JobInfoItem
                    icon={
                        GroupsOutlinedIcon
                    }
                    label="Số lượng tuyển"
                    value={`${
                        job.quantity ?? 0
                    } người`}
                />

                <JobInfoItem
                    icon={
                        GroupsOutlinedIcon
                    }
                    label="Giới tính"
                    value={formatGender(
                        job.gender
                    )}
                />

                <JobInfoItem
                    icon={
                        WorkOutlineOutlinedIcon
                    }
                    label="Chuyên môn"
                    value={
                        job.specialty ||
                        "Chưa cập nhật"
                    }
                />
            </Stack>
        </Box>
    );
}

/* =========================================================
   CKEDITOR HTML CONTENT
========================================================= */

function ContentSection({
                            title,
                            html,
                        }) {
    if (!html) {
        return null;
    }

    return (
        <section
            className={
                styles.detailSection
            }
        >
            <Typography
                className={
                    styles.sectionTitle
                }
            >
                {title}
            </Typography>

            <Box
                className={
                    styles.htmlContent
                }
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
        </section>
    );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({job}) {
    const locationHtml =
        job.work_location
            ?.map((location) => {
                const address =
                    location.address_detail ||
                    "";

                const city =
                    location.city_name ||
                    "";

                const fullAddress = [
                    address,
                    city,
                ]
                    .filter(Boolean)
                    .join(", ");

                return `<p>${fullAddress}</p>`;
            })
            .join("");

    return (
        <Box
            className={
                styles.detailCard
            }
        >
            {/* OVERVIEW */}

            <section
                className={
                    styles.detailSection
                }
            >
                <Typography
                    className={
                        styles.sectionTitle
                    }
                >
                    Tổng quan
                </Typography>

                <Box
                    className={
                        styles.overviewRows
                    }
                >
                    {/* REQUIREMENT */}

                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        className={
                            styles.overviewRow
                        }
                    >
                        <Typography
                            className={
                                styles.overviewLabel
                            }
                        >
                            Yêu cầu:
                        </Typography>

                        <Box
                            className={
                                styles.chipGroup
                            }
                        >
                            {job.experience_level && (
                                <Chip
                                    label={`${job.experience_level} kinh nghiệm`}
                                />
                            )}

                            <Chip
                                label={formatGender(
                                    job.gender
                                )}
                            />

                            <Chip
                                label={formatJobType(
                                    job.job_type
                                )}
                            />
                        </Box>
                    </Stack>

                    {/* SPECIALTY */}

                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        className={
                            styles.overviewRow
                        }
                    >
                        <Typography
                            className={
                                styles.overviewLabel
                            }
                        >
                            Chuyên môn:
                        </Typography>

                        <Box
                            className={
                                styles.chipGroup
                            }
                        >
                            {job.specialty && (
                                <Chip
                                    label={
                                        job.specialty
                                    }
                                />
                            )}

                            {job.category && (
                                <Chip
                                    label={
                                        job.category
                                    }
                                />
                            )}
                        </Box>
                    </Stack>
                </Box>
            </section>

            {/* CKEDITOR CONTENT */}

            <ContentSection
                title="Mô tả công việc"
                html={
                    job.description_html
                }
            />

            <ContentSection
                title="Yêu cầu ứng viên"
                html={
                    job.requirements_html
                }
            />

            <ContentSection
                title="Quyền lợi"
                html={
                    job.benefits_html
                }
            />

            <ContentSection
                title="Địa điểm làm việc"
                html={locationHtml}
            />
        </Box>
    );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingPage() {
    return (
        <Box
            className={styles.page}
        >
            <Header/>

            <Box
                className={styles.loadingState}
            >
                <Stack
                    spacing={2}
                    alignItems="center"
                >
                    <CircularProgress/>

                    <Typography>
                        Đang tải thông tin
                        việc làm...
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}

/* =========================================================
   PAGE
========================================================= */

export default function JobDetailPage() {
    const navigate = useNavigate();

    const handleSearch = ({keyword = "", category = "", location = ""}) => {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries({keyword, category, location})) {
            const trimmed = value.trim();
            if (trimmed) params.set(key, trimmed);
        }

        const query = params.toString();
        navigate(query ? `/jobs?${query}` : "/jobs");
    };

    const {slug} =
        useParams();

    const [job, setJob] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    /* =========================
       FETCH DETAIL
    ========================= */

    useEffect(() => {
        let cancelled = false;

        const fetchJobDetail =
            async () => {
                try {
                    setLoading(true);

                    setError("");

                    const data =
                        await getJobBySlug(
                            slug
                        );

                    console.log(
                        "GET JOB DETAIL:",
                        data
                    );

                    if (!cancelled) {
                        /*
                          Nếu BE trả trực tiếp:

                          {
                            id: ...,
                            company: ...,
                            title: ...
                          }

                          => setJob(data)

                          Nếu BE bọc response:

                          {
                            data: {...}
                          }

                          => data.data

                          Đoạn này hỗ trợ cả hai.
                        */

                        const jobData =
                            data?.data &&
                            !data?.title
                                ? data.data
                                : data;

                        setJob(jobData);
                    }
                } catch (error) {
                    console.error(
                        "GET JOB DETAIL ERROR:",
                        error
                    );

                    if (!cancelled) {
                        const message =
                            error.response
                                ?.data
                                ?.detail ||
                            error.response
                                ?.data
                                ?.message ||
                            "Không thể tải chi tiết việc làm";

                        setError(message);
                    }
                } finally {
                    if (!cancelled) {
                        setLoading(false);
                    }
                }
            };

        if (slug) {
            fetchJobDetail();
        } else {
            setError(
                "Không tìm thấy mã việc làm"
            );

            setLoading(false);
        }

        return () => {
            cancelled = true;
        };
    }, [slug]);

    /* =========================
       LOADING
    ========================= */

    if (loading) {
        return <LoadingPage/>;
    }

    /* =========================
       ERROR
    ========================= */

    if (error) {
        return (
            <Box
                className={styles.page}
            >
                <Header/>

                <Box
                    className={styles.main}
                >
                    <Alert severity="error">
                        {error}
                    </Alert>
                </Box>
            </Box>
        );
    }

    /* =========================
       NOT FOUND
    ========================= */

    if (!job) {
        return (
            <Box
                className={styles.page}
            >
                <Header/>

                <Box
                    className={styles.main}
                >
                    <Alert severity="info">
                        Không tìm thấy việc
                        làm.
                    </Alert>
                </Box>
            </Box>
        );
    }

    /* =========================
       RENDER
    ========================= */

    return (
        <Box
            className={styles.page}
        >
            <Header/>

            <Box className={styles.searchSection}>
                <HeroSearch onSearch={handleSearch}/>
            </Box>

            <Box
                className={styles.main}
            >
                <Breadcrumb job={job}/>

                <Box
                    className={
                        styles.layout
                    }
                >
                    {/* LEFT */}

                    <Box
                        className={
                            styles.leftColumn
                        }
                    >
                        <JobHeaderCard
                            job={job}
                        />

                        <Overview job={job}/>
                    </Box>

                    {/* RIGHT */}

                    <Box
                        className={
                            styles.rightColumn
                        }
                    >
                        <CompanyCard
                            company={
                                job.company
                            }
                        />

                        <GeneralInfoCard
                            job={job}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}