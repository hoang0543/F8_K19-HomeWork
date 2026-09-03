import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {
    Box,
    Paper,
    Stack,
    Typography,
    TextField,
    Button,
    MenuItem,
    Switch,
    FormControlLabel,
    Divider,
    Alert,
} from "@mui/material";

import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EDITOR_CONFIG = {licenseKey: "GPL",};

import Header from "../../../components/Header/Header.jsx";
import {createJob} from "../../../services/jobService.js";
import {getCurrentEmployerCompany} from "../../../services/employerService.js";

import styles from "./CreateJobPage.module.css";

const JOB_TYPES = [
    {
        value: "FULL_TIME",
        label: "Toàn thời gian",
    },
    {
        value: "PART_TIME",
        label: "Bán thời gian",
    },
    {
        value: "CONTRACT",
        label: "Hợp đồng",
    },
    {
        value: "INTERN",
        label: "Thực tập",
    },
    {
        value: "FREELANCE",
        label: "Freelance",
    },
];

const GENDERS = [
    {
        value: "MALE",
        label: "Nam",
    },
    {
        value: "FEMALE",
        label: "Nữ",
    },
    {
        value: "OTHER",
        label: "Không yêu cầu",
    },
];

const SALARY_TYPES = [
    {
        value: "RANGE",
        label: "Khoảng lương",
    },
];

const INITIAL_FORM = {
    title: "",
    category: "",
    specialty: "",
    job_type: "FULL_TIME",
    experience_level: "",
    gender: "OTHER",
    quantity: 1,

    salary: {
        type: "RANGE",
        min: "",
        max: "",
        currency: "VND",
        is_negotiable: false,
    },

    work_location: [
        {
            city_id: "",
            city_name: "",
            address_detail: "",
        },
    ],

    deadline: "",
    is_hot: false,

    description_html: "",
    requirements_html: "",
    benefits_html: "",
};


export default function CreateJobPage() {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState(INITIAL_FORM);

    const [errors, setErrors] =
        useState({});

    const [company, setCompany] =
        useState(null);

    const [companyLoading, setCompanyLoading] =
        useState(true);

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
                    "GET CURRENT COMPANY ERROR:",
                    error.response?.data || error
                );
            } finally {
                setCompanyLoading(false);
            }
        };

        fetchCompany();
    }, []);

    const [loading, setLoading] =
        useState(false);

    const [serverError, setServerError] =
        useState("");

    /* =========================
       BASIC CHANGE
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

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setServerError("");
    };

    /* =========================
       SALARY
    ========================= */

    const handleSalaryChange = (event) => {
        const {
            name,
            value,
            checked,
            type,
        } = event.target;

        setFormData((prev) => ({
            ...prev,

            salary: {
                ...prev.salary,

                [name]:
                    type === "checkbox"
                        ? checked
                        : value,
            },
        }));
    };

    /* =========================
       LOCATION
    ========================= */

    const handleLocationChange = (
        index,
        event
    ) => {
        const {
            name,
            value,
        } = event.target;

        setFormData((prev) => {
            const nextLocations =
                [...prev.work_location];

            nextLocations[index] = {
                ...nextLocations[index],

                [name]: value,
            };

            return {
                ...prev,

                work_location:
                nextLocations,
            };
        });
    };

    const handleAddLocation = () => {
        setFormData((prev) => ({
            ...prev,

            work_location: [
                ...prev.work_location,

                {
                    city_id: "",
                    city_name: "",
                    address_detail: "",
                },
            ],
        }));
    };

    const handleRemoveLocation = (
        index
    ) => {
        setFormData((prev) => ({
            ...prev,

            work_location:
                prev.work_location.filter(
                    (_, locationIndex) =>
                        locationIndex !== index
                ),
        }));
    };

    /* =========================
       VALIDATE
    ========================= */

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title =
                "Vui lòng nhập tiêu đề";
        }

        if (!formData.category.trim()) {
            newErrors.category =
                "Vui lòng nhập danh mục";
        }

        if (!formData.specialty.trim()) {
            newErrors.specialty =
                "Vui lòng nhập chuyên môn";
        }

        if (
            !formData.experience_level.trim()
        ) {
            newErrors.experience_level =
                "Vui lòng nhập kinh nghiệm";
        }

        if (
            Number(formData.quantity) <= 0
        ) {
            newErrors.quantity =
                "Số lượng tuyển phải lớn hơn 0";
        }

        if (!formData.deadline) {
            newErrors.deadline =
                "Vui lòng chọn hạn ứng tuyển";
        }

        if (
            !formData.salary.is_negotiable
        ) {
            const min =
                Number(
                    formData.salary.min
                );

            const max =
                Number(
                    formData.salary.max
                );

            if (min < 0) {
                newErrors.salary_min =
                    "Lương tối thiểu không hợp lệ";
            }

            if (max < min) {
                newErrors.salary_max =
                    "Lương tối đa phải lớn hơn hoặc bằng lương tối thiểu";
            }
        }

        const invalidLocation =
            formData.work_location.some(
                (location) =>
                    !location.city_name.trim() ||
                    !location.address_detail.trim()
            );

        if (invalidLocation) {
            newErrors.work_location =
                "Vui lòng nhập đầy đủ địa điểm làm việc";
        }

        if (
            !formData.description_html
                .replace(/<[^>]*>/g, "")
                .trim()
        ) {
            newErrors.description_html =
                "Vui lòng nhập mô tả công việc";
        }

        if (
            !formData.requirements_html
                .replace(/<[^>]*>/g, "")
                .trim()
        ) {
            newErrors.requirements_html =
                "Vui lòng nhập yêu cầu ứng viên";
        }

        if (
            !formData.benefits_html
                .replace(/<[^>]*>/g, "")
                .trim()
        ) {
            newErrors.benefits_html =
                "Vui lòng nhập quyền lợi";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors)
                .length === 0
        );
    };

    /* =========================
       SUBMIT
    ========================= */

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate trước khi gửi API
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setServerError("");

            const payload = {
                title: formData.title.trim(),

                category:
                    formData.category.trim(),

                specialty:
                    formData.specialty.trim(),

                job_type:
                formData.job_type,

                experience_level:
                    formData.experience_level.trim(),

                gender:
                formData.gender,

                quantity:
                    Number(formData.quantity),

                salary: {
                    type:
                    formData.salary.type,

                    min:
                        Number(
                            formData.salary.min
                        ),

                    max:
                        Number(
                            formData.salary.max
                        ),

                    currency:
                    formData.salary.currency,

                    is_negotiable:
                        Boolean(
                            formData.salary
                                .is_negotiable
                        ),
                },

                work_location:
                    formData.work_location.map(
                        (location) => ({
                            city_id:
                                Number(
                                    location.city_id
                                ),

                            city_name:
                                location.city_name.trim(),

                            address_detail:
                                location.address_detail.trim(),
                        })
                    ),

                deadline:
                    new Date(
                        formData.deadline
                    ).toISOString(),

                is_hot:
                    Boolean(formData.is_hot),

                description_html:
                    formData.description_html.trim(),

                requirements_html:
                    formData.requirements_html.trim(),

                benefits_html:
                    formData.benefits_html.trim(),
            };

            console.log(
                "CREATE JOB PAYLOAD FULL:",
                JSON.stringify(
                    payload,
                    null,
                    2
                )
            );

            const response =
                await createJob(payload);

            console.log(
                "CREATE JOB SUCCESS:",
                response
            );

            // Reset form
            setFormData(INITIAL_FORM);

            setErrors({});

            // Chuyển trang sau khi tạo thành công
            navigate("/jobs");

        } catch (error) {
            console.error(
                "CREATE JOB ERROR:",
                error.response?.data ||
                error
            );

            setServerError(
                error.response?.data?.message ||
                "Không thể tạo tin tuyển dụng."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className={styles.page}>
            <Header mode="employer"
                    companyName={company?.company_name || ""}/>

            <Box className={styles.main}>
                <Box className={styles.welcomeBox}>
                    <Typography className={styles.welcomeTitle}>
                        Chào mừng,{" "}
                        <Box
                            component="span"
                            className={styles.companyName}
                        >
                            {companyLoading
                                ? "Đang tải..."
                                : company?.company_name ||
                                "Nhà tuyển dụng"}
                        </Box>
                        👋
                    </Typography>

                    <Typography className={styles.welcomeDescription}>
                        Hãy tạo tin tuyển dụng mới và tìm kiếm những ứng viên phù hợp cho công ty của bạn.
                    </Typography>
                </Box>

                <Stack
                    component="form"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    {/* BASIC */}

                    <Paper
                        elevation={0}
                        className={styles.card}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            className={
                                styles.sectionHeader
                            }
                        >
                            <WorkOutlineOutlinedIcon/>

                            <Typography
                                className={
                                    styles.sectionTitle
                                }
                            >
                                Thông tin cơ bản
                            </Typography>
                        </Stack>

                        <Divider
                            className={
                                styles.divider
                            }
                        />

                        <Box
                            className={
                                styles.formGrid
                            }
                        >
                            <Box
                                className={
                                    styles.fullWidth
                                }
                            >
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Tiêu đề công việc
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="title"
                                    placeholder="Ví dụ: Frontend Developer ReactJS"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    error={Boolean(
                                        errors.title
                                    )}
                                    helperText={
                                        errors.title
                                    }
                                    className={
                                        styles.input
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Danh mục
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="category"
                                    placeholder="Ví dụ: Công nghệ thông tin"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    error={Boolean(
                                        errors.category
                                    )}
                                    helperText={
                                        errors.category
                                    }
                                    className={
                                        styles.input
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Chuyên môn
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="specialty"
                                    placeholder="Ví dụ: Frontend"
                                    value={
                                        formData.specialty
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    error={Boolean(
                                        errors.specialty
                                    )}
                                    helperText={
                                        errors.specialty
                                    }
                                    className={
                                        styles.input
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Hình thức làm việc
                                </Typography>

                                <TextField
                                    select
                                    fullWidth
                                    name="job_type"
                                    value={
                                        formData.job_type
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        styles.input
                                    }
                                >
                                    {JOB_TYPES.map(
                                        (item) => (
                                            <MenuItem
                                                key={
                                                    item.value
                                                }
                                                value={
                                                    item.value
                                                }
                                            >
                                                {item.label}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Kinh nghiệm
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="experience_level"
                                    placeholder="Ví dụ: 2 năm"
                                    value={
                                        formData.experience_level
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    error={Boolean(
                                        errors.experience_level
                                    )}
                                    helperText={
                                        errors.experience_level
                                    }
                                    className={
                                        styles.input
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Giới tính
                                </Typography>

                                <TextField
                                    select
                                    fullWidth
                                    name="gender"
                                    value={
                                        formData.gender
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        styles.input
                                    }
                                >
                                    {GENDERS.map(
                                        (item) => (
                                            <MenuItem
                                                key={
                                                    item.value
                                                }
                                                value={
                                                    item.value
                                                }
                                            >
                                                {item.label}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Số lượng tuyển
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="quantity"
                                    type="number"
                                    inputProps={{
                                        min: 1,
                                    }}
                                    value={
                                        formData.quantity
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    error={Boolean(
                                        errors.quantity
                                    )}
                                    helperText={
                                        errors.quantity
                                    }
                                    className={
                                        styles.input
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Hạn ứng tuyển
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="deadline"
                                    type="datetime-local"
                                    value={
                                        formData.deadline
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    error={Boolean(
                                        errors.deadline
                                    )}
                                    helperText={
                                        errors.deadline
                                    }
                                    className={
                                        styles.input
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                        </Box>
                    </Paper>

                    {/* SALARY */}

                    <Paper
                        elevation={0}
                        className={styles.card}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            className={
                                styles.sectionHeader
                            }
                        >
                            <PaidOutlinedIcon/>

                            <Typography
                                className={
                                    styles.sectionTitle
                                }
                            >
                                Mức lương
                            </Typography>
                        </Stack>

                        <Divider
                            className={
                                styles.divider
                            }
                        />

                        <Box
                            className={
                                styles.formGrid
                            }
                        >
                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Loại lương
                                </Typography>

                                <TextField
                                    select
                                    fullWidth
                                    name="type"
                                    value={
                                        formData.salary.type
                                    }
                                    onChange={
                                        handleSalaryChange
                                    }
                                    className={
                                        styles.input
                                    }
                                >
                                    {SALARY_TYPES.map(
                                        (item) => (
                                            <MenuItem
                                                key={
                                                    item.value
                                                }
                                                value={
                                                    item.value
                                                }
                                            >
                                                {item.label}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Đơn vị tiền
                                </Typography>

                                <TextField
                                    select
                                    fullWidth
                                    name="currency"
                                    value={
                                        formData.salary.currency
                                    }
                                    onChange={
                                        handleSalaryChange
                                    }
                                    className={
                                        styles.input
                                    }
                                >
                                    <MenuItem value="VND">
                                        VND
                                    </MenuItem>

                                    <MenuItem value="USD">
                                        USD
                                    </MenuItem>
                                </TextField>
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Lương tối thiểu
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="min"
                                    type="number"
                                    disabled={
                                        formData.salary
                                            .is_negotiable
                                    }
                                    value={
                                        formData.salary.min
                                    }
                                    onChange={
                                        handleSalaryChange
                                    }
                                    error={Boolean(
                                        errors.salary_min
                                    )}
                                    helperText={
                                        errors.salary_min
                                    }
                                    className={
                                        styles.input
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Lương tối đa
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="max"
                                    type="number"
                                    disabled={
                                        formData.salary
                                            .is_negotiable
                                    }
                                    value={
                                        formData.salary.max
                                    }
                                    onChange={
                                        handleSalaryChange
                                    }
                                    error={Boolean(
                                        errors.salary_max
                                    )}
                                    helperText={
                                        errors.salary_max
                                    }
                                    className={
                                        styles.input
                                    }
                                />
                            </Box>
                        </Box>

                        <FormControlLabel
                            control={
                                <Switch
                                    name="is_negotiable"
                                    checked={
                                        formData.salary
                                            .is_negotiable
                                    }
                                    onChange={
                                        handleSalaryChange
                                    }
                                />
                            }
                            label="Lương thỏa thuận"
                        />
                    </Paper>

                    {/* LOCATION */}

                    <Paper
                        elevation={0}
                        className={styles.card}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                className={
                                    styles.sectionHeader
                                }
                            >
                                <AddLocationAltOutlinedIcon/>

                                <Typography
                                    className={
                                        styles.sectionTitle
                                    }
                                >
                                    Địa điểm làm việc
                                </Typography>
                            </Stack>

                            <Button
                                type="button"
                                onClick={
                                    handleAddLocation
                                }
                            >
                                + Thêm địa điểm
                            </Button>
                        </Stack>

                        <Divider
                            className={
                                styles.divider
                            }
                        />

                        <Stack spacing={2}>
                            {formData.work_location.map(
                                (
                                    location,
                                    index
                                ) => (
                                    <Box
                                        key={index}
                                        className={
                                            styles.locationCard
                                        }
                                    >
                                        <Box
                                            className={
                                                styles.locationGrid
                                            }
                                        >
                                            <Box>
                                                <Typography
                                                    className={
                                                        styles.label
                                                    }
                                                >
                                                    City ID
                                                </Typography>

                                                <TextField
                                                    fullWidth
                                                    name="city_id"
                                                    type="number"
                                                    value={
                                                        location.city_id
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        handleLocationChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    className={
                                                        styles.input
                                                    }
                                                />
                                            </Box>

                                            <Box>
                                                <Typography
                                                    className={
                                                        styles.label
                                                    }
                                                >
                                                    Tỉnh / Thành phố
                                                </Typography>

                                                <TextField
                                                    fullWidth
                                                    name="city_name"
                                                    placeholder="Ví dụ: Hà Nội"
                                                    value={
                                                        location.city_name
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        handleLocationChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    className={
                                                        styles.input
                                                    }
                                                />
                                            </Box>

                                            <Box
                                                className={
                                                    styles.fullWidth
                                                }
                                            >
                                                <Typography
                                                    className={
                                                        styles.label
                                                    }
                                                >
                                                    Địa chỉ chi tiết
                                                </Typography>

                                                <TextField
                                                    fullWidth
                                                    name="address_detail"
                                                    placeholder="Ví dụ: 123 Cầu Giấy, Hà Nội"
                                                    value={
                                                        location.address_detail
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        handleLocationChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    className={
                                                        styles.input
                                                    }
                                                />
                                            </Box>
                                        </Box>

                                        {formData
                                            .work_location
                                            .length > 1 && (
                                            <Button
                                                type="button"
                                                color="error"
                                                onClick={() =>
                                                    handleRemoveLocation(
                                                        index
                                                    )
                                                }
                                            >
                                                Xóa địa điểm
                                            </Button>
                                        )}
                                    </Box>
                                )
                            )}
                        </Stack>

                        {errors.work_location && (
                            <Typography
                                className={
                                    styles.errorText
                                }
                            >
                                {
                                    errors.work_location
                                }
                            </Typography>
                        )}
                    </Paper>

                    {/* CONTENT */}

                    <Paper
                        elevation={0}
                        className={styles.card}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            className={
                                styles.sectionHeader
                            }
                        >
                            <DescriptionOutlinedIcon/>

                            <Typography
                                className={
                                    styles.sectionTitle
                                }
                            >
                                Nội dung tuyển dụng
                            </Typography>
                        </Stack>

                        <Divider
                            className={
                                styles.divider
                            }
                        />

                        <Stack spacing={3}>
                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Mô tả công việc
                                </Typography>

                                <Box
                                    className={
                                        styles.editor
                                    }
                                >
                                    <CKEditor
                                        editor={
                                            ClassicEditor
                                        }
                                        config={EDITOR_CONFIG}
                                        data={
                                            formData.description_html
                                        }
                                        onChange={(
                                            event,
                                            editor
                                        ) => {
                                            const data =
                                                editor.getData();

                                            setFormData(
                                                (prev) => ({
                                                    ...prev,

                                                    description_html:
                                                    data,
                                                })
                                            );
                                        }}
                                    />
                                </Box>

                                {errors.description_html && (
                                    <Typography
                                        className={
                                            styles.errorText
                                        }
                                    >
                                        {
                                            errors.description_html
                                        }
                                    </Typography>
                                )}
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Yêu cầu ứng viên
                                </Typography>

                                <Box
                                    className={
                                        styles.editor
                                    }
                                >
                                    <CKEditor
                                        editor={
                                            ClassicEditor
                                        }
                                        config={EDITOR_CONFIG}
                                        data={
                                            formData.requirements_html
                                        }
                                        onChange={(
                                            event,
                                            editor
                                        ) => {
                                            const data =
                                                editor.getData();

                                            setFormData(
                                                (prev) => ({
                                                    ...prev,

                                                    requirements_html:
                                                    data,
                                                })
                                            );
                                        }}
                                    />
                                </Box>

                                {errors.requirements_html && (
                                    <Typography
                                        className={
                                            styles.errorText
                                        }
                                    >
                                        {
                                            errors.requirements_html
                                        }
                                    </Typography>
                                )}
                            </Box>

                            <Box>
                                <Typography
                                    className={
                                        styles.label
                                    }
                                >
                                    Quyền lợi
                                </Typography>

                                <Box
                                    className={
                                        styles.editor
                                    }
                                >
                                    <CKEditor
                                        editor={
                                            ClassicEditor
                                        }
                                        config={EDITOR_CONFIG}
                                        data={
                                            formData.benefits_html
                                        }
                                        onChange={(
                                            event,
                                            editor
                                        ) => {
                                            const data =
                                                editor.getData();

                                            setFormData(
                                                (prev) => ({
                                                    ...prev,

                                                    benefits_html:
                                                    data,
                                                })
                                            );
                                        }}
                                    />
                                </Box>

                                {errors.benefits_html && (
                                    <Typography
                                        className={
                                            styles.errorText
                                        }
                                    >
                                        {
                                            errors.benefits_html
                                        }
                                    </Typography>
                                )}
                            </Box>
                        </Stack>
                    </Paper>

                    {/* SETTINGS */}

                    <Paper
                        elevation={0}
                        className={styles.card}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={
                                        formData.is_hot
                                    }
                                    onChange={(event) =>
                                        setFormData(
                                            (prev) => ({
                                                ...prev,

                                                is_hot:
                                                event.target
                                                    .checked,
                                            })
                                        )
                                    }
                                />
                            }
                            label="Đánh dấu việc làm HOT"
                        />
                    </Paper>

                    {/* SERVER ERROR */}

                    {serverError && (
                        <Alert severity="error">
                            {serverError}
                        </Alert>
                    )}

                    {/* SUBMIT */}

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() =>
                                navigate("/jobs")
                            }
                            className={
                                styles.cancelButton
                            }
                        >
                            Hủy
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={
                                !loading
                                    ? (
                                        <SendOutlinedIcon/>
                                    )
                                    : undefined
                            }
                            disabled={loading}
                            className={
                                styles.submitButton
                            }
                        >
                            {loading
                                ? "Đang tạo..."
                                : "Đăng tin"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}