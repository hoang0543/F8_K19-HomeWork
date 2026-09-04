import {
    useEffect,
    useState,
} from "react";

import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import Header from "../../../components/Header/Header.jsx";

import {createCV,} from "../../../services/candidateService.js";

import styles from "./CreateCVPage.module.css";


const initialForm = {
    full_name: "",
    phone: "",
    email: "",
    summary: "",
    education: [],
    experience: [],
    skills: [],
};


export default function CreateCVPage() {
    const [saving, setSaving] =
        useState(false);

    const [saveError, setSaveError] =
        useState("");

    const [saveSuccess, setSaveSuccess] =
        useState("");

    const [formData, setFormData] =
        useState(initialForm);


    /* =========================
       PREFILL CANDIDATE
    ========================= */

    useEffect(() => {
        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            return;
        }

        try {
            const user =
                JSON.parse(savedUser);

            if (
                user?.role !== "CANDIDATE"
            ) {
                return;
            }

            setFormData((prev) => ({
                ...prev,

                full_name:
                    prev.full_name ||
                    user.full_name ||
                    "",

                email:
                    prev.email ||
                    user.email ||
                    "",
            }));
        } catch (error) {
            console.error(
                "PARSE USER ERROR:",
                error
            );
        }
    }, []);


    /* =========================
       INPUT
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
    };

    /* =========================
       EDUCATION
    ========================= */

    const addEducation = () => {
        setFormData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    school: "",
                    major: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                },
            ],
        }));
    };

    const updateEducation = (
        index,
        field,
        value
    ) => {
        setFormData((prev) => ({
            ...prev,

            education: prev.education.map(
                (item, i) =>
                    i === index
                        ? {
                            ...item,
                            [field]: value,
                        }
                        : item
            ),
        }));
    };

    const removeEducation = (index) => {
        setFormData((prev) => ({
            ...prev,

            education: prev.education.filter(
                (_, i) => i !== index
            ),
        }));
    };

    /* =========================
       EXPERIENCE
    ========================= */

    const addExperience = () => {
        setFormData((prev) => ({
            ...prev,

            experience: [
                ...prev.experience,
                {
                    company: "",
                    position: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                },
            ],
        }));
    };

    const updateExperience = (
        index,
        field,
        value
    ) => {
        setFormData((prev) => ({
            ...prev,

            experience: prev.experience.map(
                (item, i) =>
                    i === index
                        ? {
                            ...item,
                            [field]: value,
                        }
                        : item
            ),
        }));
    };

    const removeExperience = (index) => {
        setFormData((prev) => ({
            ...prev,

            experience: prev.experience.filter(
                (_, i) => i !== index
            ),
        }));
    };

    /* =========================
       SKILLS
    ========================= */

    const addSkill = () => {
        setFormData((prev) => ({
            ...prev,
            skills: [
                ...prev.skills,
                {
                    name: "",
                },
            ],
        }));
    };

    const updateSkill = (
        index,
        value
    ) => {
        setFormData((prev) => ({
            ...prev,

            skills: prev.skills.map(
                (item, i) =>
                    i === index
                        ? {
                            ...item,
                            name: value,
                        }
                        : item
            ),
        }));
    };

    const removeSkill = (index) => {
        setFormData((prev) => ({
            ...prev,

            skills: prev.skills.filter(
                (_, i) => i !== index
            ),
        }));
    };

    /* =========================
       SUBMIT
    ========================= */

    const handleSubmit = async () => {
        setSaveError("");
        setSaveSuccess("");

        if (!formData.full_name.trim()) {
            setSaveError(
                "Vui lòng nhập họ và tên."
            );
            return;
        }

        if (!formData.email.trim()) {
            setSaveError(
                "Vui lòng nhập email."
            );
            return;
        }

        const payload = {
            full_name: formData.full_name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            summary: formData.summary.trim(),
            education: [],
            experience: [],
            skills: [],
        };

        try {
            setSaving(true);

            console.log(
                "CREATE CV PAYLOAD FULL:",
                JSON.stringify(payload, null, 2)
            );

            const response =
                await createCV(payload);

            console.log(
                "CREATE CV RESPONSE:",
                response
            );

            setSaveSuccess(
                "CV đã được tạo thành công!"
            );
        } catch (error) {
            console.error(
                "CREATE CV ERROR:",
                error.response?.data || error
            );

            setSaveError(
                error.response?.data?.message ||
                "Không thể tạo CV. Vui lòng thử lại."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box className={styles.page}>
            <Header mode="candidate"/>

            <Box className={styles.pageHeader}>
                <Typography className={styles.pageTitle}>
                    Tạo CV chuyên nghiệp
                </Typography>

                <Typography
                    className={styles.pageDescription}
                >
                    Điền thông tin của bạn và xem trước
                    CV theo thời gian thực.
                </Typography>
            </Box>

            <Box className={styles.workspace}>
                {/* =========================
                    LEFT - CV PREVIEW
                ========================= */}

                <Box className={styles.previewArea}>
                    <Box className={styles.cvPaper}>
                        {/* PERSONAL */}

                        <Box className={styles.cvHeader}>
                            <Box>
                                <Typography
                                    className={
                                        styles.cvName
                                    }
                                >
                                    {formData.full_name ||
                                        "NGUYỄN VĂN A"}
                                </Typography>

                                <Typography
                                    className={
                                        styles.cvPosition
                                    }
                                >
                                    Ứng viên
                                </Typography>
                            </Box>

                            <Stack
                                spacing={0.7}
                                className={
                                    styles.contact
                                }
                            >
                                <Stack
                                    direction="row"
                                    spacing={0.7}
                                >
                                    <PhoneOutlinedIcon/>

                                    <span>
                                        {formData.phone ||
                                            "0123 456 789"}
                                    </span>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={0.7}
                                >
                                    <EmailOutlinedIcon/>

                                    <span>
                                        {formData.email ||
                                            "email@example.com"}
                                    </span>
                                </Stack>
                            </Stack>
                        </Box>

                        {/* SUMMARY */}

                        <CVSection title="MỤC TIÊU NGHỀ NGHIỆP">
                            <Typography
                                className={
                                    styles.cvParagraph
                                }
                            >
                                {formData.summary ||
                                    "Hãy nhập phần giới thiệu và mục tiêu nghề nghiệp của bạn."}
                            </Typography>
                        </CVSection>

                        {/* EDUCATION */}

                        <CVSection title="HỌC VẤN">
                            {formData.education.length ===
                            0 ? (
                                <EmptyPreview>
                                    Chưa có thông tin học vấn
                                </EmptyPreview>
                            ) : (
                                formData.education.map(
                                    (item, index) => (
                                        <Box
                                            key={index}
                                            className={
                                                styles.cvItem
                                            }
                                        >
                                            <Box
                                                className={
                                                    styles.cvItemDate
                                                }
                                            >
                                                {item.start_date ||
                                                    "2023"}
                                                {" - "}
                                                {item.end_date ||
                                                    "2027"}
                                            </Box>

                                            <Box
                                                className={
                                                    styles.cvItemContent
                                                }
                                            >
                                                <Typography
                                                    className={
                                                        styles.cvItemTitle
                                                    }
                                                >
                                                    {item.school ||
                                                        "Tên trường"}
                                                </Typography>

                                                <Typography
                                                    className={
                                                        styles.cvItemSubtitle
                                                    }
                                                >
                                                    {item.major ||
                                                        "Chuyên ngành"}
                                                </Typography>

                                                {item.description && (
                                                    <Typography
                                                        className={
                                                            styles.cvParagraph
                                                        }
                                                    >
                                                        {
                                                            item.description
                                                        }
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    )
                                )
                            )}
                        </CVSection>

                        {/* EXPERIENCE */}

                        <CVSection title="KINH NGHIỆM LÀM VIỆC">
                            {formData.experience.length ===
                            0 ? (
                                <EmptyPreview>
                                    Chưa có kinh nghiệm
                                </EmptyPreview>
                            ) : (
                                formData.experience.map(
                                    (item, index) => (
                                        <Box
                                            key={index}
                                            className={
                                                styles.cvItem
                                            }
                                        >
                                            <Box
                                                className={
                                                    styles.cvItemDate
                                                }
                                            >
                                                {item.start_date ||
                                                    "2025"}
                                                {" - "}
                                                {item.end_date ||
                                                    "Hiện tại"}
                                            </Box>

                                            <Box
                                                className={
                                                    styles.cvItemContent
                                                }
                                            >
                                                <Typography
                                                    className={
                                                        styles.cvItemTitle
                                                    }
                                                >
                                                    {item.company ||
                                                        "Tên công ty"}
                                                </Typography>

                                                <Typography
                                                    className={
                                                        styles.cvItemSubtitle
                                                    }
                                                >
                                                    {item.position ||
                                                        "Vị trí công việc"}
                                                </Typography>

                                                {item.description && (
                                                    <Typography
                                                        className={
                                                            styles.cvParagraph
                                                        }
                                                    >
                                                        {
                                                            item.description
                                                        }
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    )
                                )
                            )}
                        </CVSection>

                        {/* SKILLS */}

                        <CVSection title="KỸ NĂNG">
                            <Box
                                className={
                                    styles.skillList
                                }
                            >
                                {formData.skills.length ===
                                0 ? (
                                    <EmptyPreview>
                                        Chưa có kỹ năng
                                    </EmptyPreview>
                                ) : (
                                    formData.skills.map(
                                        (skill, index) => (
                                            <Box
                                                key={index}
                                                className={
                                                    styles.skill
                                                }
                                            >
                                                {skill.name ||
                                                    "Kỹ năng"}
                                            </Box>
                                        )
                                    )
                                )}
                            </Box>
                        </CVSection>
                    </Box>
                </Box>

                {/* =========================
                    RIGHT - EDITOR
                ========================= */}

                <Box className={styles.editor}>
                    <Typography
                        className={styles.editorTitle}
                    >
                        Nội dung CV
                    </Typography>

                    <FormSection title="Thông tin cá nhân">
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            label="Giới thiệu bản thân"
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                        />
                    </FormSection>

                    {/* EDUCATION */}

                    <FormSection
                        title="Học vấn"
                        action={
                            <Button
                                startIcon={<AddIcon/>}
                                onClick={addEducation}
                            >
                                Thêm
                            </Button>
                        }
                    >
                        {formData.education.map(
                            (item, index) => (
                                <Box
                                    key={index}
                                    className={
                                        styles.formItem
                                    }
                                >
                                    <ItemHeader
                                        title={`Học vấn ${
                                            index + 1
                                        }`}
                                        onDelete={() =>
                                            removeEducation(
                                                index
                                            )
                                        }
                                    />

                                    <TextField
                                        fullWidth
                                        label="Trường học"
                                        value={
                                            item.school
                                        }
                                        onChange={(e) =>
                                            updateEducation(
                                                index,
                                                "school",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <TextField
                                        fullWidth
                                        label="Chuyên ngành"
                                        value={
                                            item.major
                                        }
                                        onChange={(e) =>
                                            updateEducation(
                                                index,
                                                "major",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <Box
                                        className={
                                            styles.dateRow
                                        }
                                    >
                                        <TextField
                                            fullWidth
                                            label="Bắt đầu"
                                            value={
                                                item.start_date
                                            }
                                            onChange={(e) =>
                                                updateEducation(
                                                    index,
                                                    "start_date",
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Kết thúc"
                                            value={
                                                item.end_date
                                            }
                                            onChange={(e) =>
                                                updateEducation(
                                                    index,
                                                    "end_date",
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                        />
                                    </Box>

                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        label="Mô tả"
                                        value={
                                            item.description
                                        }
                                        onChange={(e) =>
                                            updateEducation(
                                                index,
                                                "description",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </Box>
                            )
                        )}
                    </FormSection>

                    {/* EXPERIENCE */}

                    <FormSection
                        title="Kinh nghiệm"
                        action={
                            <Button
                                startIcon={<AddIcon/>}
                                onClick={addExperience}
                            >
                                Thêm
                            </Button>
                        }
                    >
                        {formData.experience.map(
                            (item, index) => (
                                <Box
                                    key={index}
                                    className={
                                        styles.formItem
                                    }
                                >
                                    <ItemHeader
                                        title={`Kinh nghiệm ${
                                            index + 1
                                        }`}
                                        onDelete={() =>
                                            removeExperience(
                                                index
                                            )
                                        }
                                    />

                                    <TextField
                                        fullWidth
                                        label="Công ty"
                                        value={
                                            item.company
                                        }
                                        onChange={(e) =>
                                            updateExperience(
                                                index,
                                                "company",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <TextField
                                        fullWidth
                                        label="Vị trí"
                                        value={
                                            item.position
                                        }
                                        onChange={(e) =>
                                            updateExperience(
                                                index,
                                                "position",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <Box
                                        className={
                                            styles.dateRow
                                        }
                                    >
                                        <TextField
                                            fullWidth
                                            label="Bắt đầu"
                                            value={
                                                item.start_date
                                            }
                                            onChange={(e) =>
                                                updateExperience(
                                                    index,
                                                    "start_date",
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Kết thúc"
                                            value={
                                                item.end_date
                                            }
                                            onChange={(e) =>
                                                updateExperience(
                                                    index,
                                                    "end_date",
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                        />
                                    </Box>

                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        label="Mô tả công việc"
                                        value={
                                            item.description
                                        }
                                        onChange={(e) =>
                                            updateExperience(
                                                index,
                                                "description",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </Box>
                            )
                        )}
                    </FormSection>

                    {/* SKILLS */}

                    <FormSection
                        title="Kỹ năng"
                        action={
                            <Button
                                startIcon={<AddIcon/>}
                                onClick={addSkill}
                            >
                                Thêm
                            </Button>
                        }
                    >
                        {formData.skills.map(
                            (skill, index) => (
                                <Stack
                                    key={index}
                                    direction="row"
                                    spacing={1}
                                >
                                    <TextField
                                        fullWidth
                                        label={`Kỹ năng ${
                                            index + 1
                                        }`}
                                        value={
                                            skill.name
                                        }
                                        onChange={(e) =>
                                            updateSkill(
                                                index,
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <IconButton
                                        onClick={() =>
                                            removeSkill(
                                                index
                                            )
                                        }
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </Stack>
                            )
                        )}
                    </FormSection>

                    {saveError && (
                        <Typography
                            className={styles.errorMessage}
                        >
                            {saveError}
                        </Typography>
                    )}

                    {saveSuccess && (
                        <Typography
                            className={styles.successMessage}
                        >
                            {saveSuccess}
                        </Typography>
                    )}


                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SaveOutlinedIcon/>}
                        className={styles.saveButton}
                        onClick={handleSubmit}
                        disabled={saving}>
                        {saving
                            ? "Đang lưu..."
                            : "Lưu CV"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

function CVSection({
                       title,
                       children,
                   }) {
    return (
        <Box className={styles.cvSection}>
            <Typography
                className={styles.cvSectionTitle}
            >
                {title}
            </Typography>

            {children}
        </Box>
    );
}

function FormSection({
                         title,
                         action,
                         children,
                     }) {
    return (
        <Box className={styles.formSection}>
            <Box
                className={
                    styles.formSectionHeader
                }
            >
                <Typography
                    className={
                        styles.formSectionTitle
                    }
                >
                    {title}
                </Typography>

                {action}
            </Box>

            <Stack spacing={2}>
                {children}
            </Stack>
        </Box>
    );
}

function ItemHeader({
                        title,
                        onDelete,
                    }) {
    return (
        <Box className={styles.itemHeader}>
            <Typography
                className={styles.itemTitle}
            >
                {title}
            </Typography>

            <IconButton
                size="small"
                onClick={onDelete}
            >
                <DeleteIcon/>
            </IconButton>
        </Box>
    );
}

function EmptyPreview({
                          children,
                      }) {
    return (
        <Typography
            className={styles.emptyPreview}
        >
            {children}
        </Typography>
    );
}