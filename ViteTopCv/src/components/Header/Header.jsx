import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {
    Box,
    Stack,
    Typography,
    Button,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import {
    NAV_LINKS,
    JOB_MENU,
    CV_MENU,
    TOOL_MENU,
    CAREER_MENU,
} from "../../data/CandidateJobListPage.js";

import styles from "./Header.module.css";

const GREEN = "#00B14F";
const GREEN_DARK = "#008C40";
const NAVY = "#18191C";

/* =========================
   LOGO
========================= */

function TopCvLogo({
                       size = 26,
                       light = false,
                       showTagline = false,
                   }) {
    return (
        <Box className={styles.logo}>
            <Typography
                component="span"
                className={styles.logoText}
                style={{fontSize: size}}
            >
                <Box
                    component="span"
                    className={
                        light
                            ? styles.logoTopLight
                            : styles.logoTop
                    }
                >
                    top
                </Box>

                <Box
                    component="span"
                    className={styles.logoCv}
                >
                    cv
                </Box>
            </Typography>

            {showTagline && (
                <Typography
                    className={
                        light
                            ? styles.taglineLight
                            : styles.tagline
                    }
                >
                    Tiếp lợi thế, nối thành công
                </Typography>
            )}
        </Box>
    );
}

/* =========================
   COMMON MENU ITEM
========================= */

function MenuItem({item}) {
    const Icon = item.icon;

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            className={styles.menuItem}
        >
            <Icon className={styles.menuIcon}/>

            <Typography className={styles.menuText}>
                {item.label}
            </Typography>
        </Stack>
    );
}

/* =========================
   JOB MEGA MENU
========================= */

function JobMegaMenu() {
    return (
        <Box className={styles.megaMenu}>
            <Box className={styles.jobMenuGrid}>
                {/* Column 1 */}
                <Box>
                    <Typography className={styles.menuTitle}>
                        {JOB_MENU.byType.title}
                    </Typography>

                    <Stack spacing={0.8}>
                        {JOB_MENU.byType.items.map((item) => (
                            <MenuItem
                                key={item.label}
                                item={item}
                            />
                        ))}
                    </Stack>

                    <Typography
                        className={`${styles.menuTitle} ${styles.companyTitle}`}
                    >
                        {JOB_MENU.byType.company.title}
                    </Typography>

                    <Stack spacing={0.8}>
                        {JOB_MENU.byType.company.items.map(
                            (item) => (
                                <MenuItem
                                    key={item.label}
                                    item={item}
                                />
                            )
                        )}
                    </Stack>
                </Box>

                {/* Column 2 */}
                <Box>
                    <Typography className={styles.menuTitle}>
                        {JOB_MENU.byPosition.title}
                    </Typography>

                    <Box className={styles.positionGrid}>
                        <Stack spacing={1.2}>
                            {JOB_MENU.byPosition.colA.map((item) => (
                                <Typography
                                    key={item}
                                    className={styles.simpleMenuItem}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Stack>

                        <Stack spacing={1.2}>
                            {JOB_MENU.byPosition.colB.map((item) => (
                                <Typography
                                    key={item}
                                    className={styles.simpleMenuItem}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>
                </Box>

                {/* Column 3 */}
                <Box>
                    <Typography className={styles.menuTitle}>
                        {JOB_MENU.byField.title}
                    </Typography>

                    <Stack spacing={1.2}>
                        {JOB_MENU.byField.items.map((item) => (
                            <Typography
                                key={item}
                                className={styles.simpleMenuItem}
                            >
                                {item}
                            </Typography>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

/* =========================
   CV MEGA MENU
========================= */

function CvMegaMenu() {
    return (
        <Box className={styles.megaMenu}>
            <Box className={styles.cvMenuGrid}>
                <Box>
                    <Typography className={styles.menuTitle}>
                        {CV_MENU.byStyle.title}
                    </Typography>

                    <Stack spacing={0.8}>
                        {CV_MENU.byStyle.items.map((item) => (
                            <MenuItem
                                key={item.label}
                                item={item}
                            />
                        ))}
                    </Stack>
                </Box>

                <Box>
                    <Typography className={styles.menuTitle}>
                        {CV_MENU.byStyle.position.title}
                    </Typography>

                    <Box className={styles.cvPositionGrid}>
                        {CV_MENU.byStyle.position.items.map(
                            (item) => (
                                <MenuItem
                                    key={item.label}
                                    item={item}
                                />
                            )
                        )}
                    </Box>
                </Box>

                <Box>
                    <Typography className={styles.menuTitle}>
                        CÔNG CỤ CV
                    </Typography>

                    <Stack spacing={0.8}>
                        {CV_MENU.cvOption.map((item) => (
                            <MenuItem
                                key={item.label}
                                item={item}
                            />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

/* =========================
   TOOL MEGA MENU
========================= */

function ToolMegaMenu() {
    return (
        <Box className={styles.megaMenu}>
            <Typography className={styles.menuTitle}>
                {TOOL_MENU.title}
            </Typography>

            <Box className={styles.smallMenuGrid}>
                {TOOL_MENU.items.map((item) => (
                    <MenuItem
                        key={item.label}
                        item={item}
                    />
                ))}
            </Box>
        </Box>
    );
}

/* =========================
   CAREER MEGA MENU
========================= */

function CareerMegaMenu() {
    return (
        <Box className={styles.megaMenu}>
            <Typography className={styles.menuTitle}>
                {CAREER_MENU.title}
            </Typography>

            <Box className={styles.smallMenuGrid}>
                {CAREER_MENU.items.map((item) => (
                    <MenuItem
                        key={item.label}
                        item={item}
                    />
                ))}
            </Box>
        </Box>
    );
}

/* =========================
   HEADER
========================= */

export default function Header({mode = "candidate", companyName = "",}) {
    const theme = useTheme();

    const isMdUp = useMediaQuery(
        theme.breakpoints.up("md")
    );

    const navigate = useNavigate();

    const [openMenu, setOpenMenu] =
        useState(null);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem("company_name");

        navigate("/employer/login", {
            replace: true,
        });
    };

    const handleEmployerAction = () => {
        if (mode === "employer") {
            navigate("/employer/jobs/create");
            return;
        }

        navigate("/employer/login");
    };

    return (
        <Box
            component="header"
            className={styles.header}
            onMouseLeave={() => setOpenMenu(null)}
        >
            {/* LEFT */}
            <Stack
                direction="row"
                alignItems="center"
                className={styles.leftSection}
            >
                <Box
                    className={styles.logoLink}
                    onClick={() => navigate("/jobs")}
                >
                    <TopCvLogo
                        size={isMdUp ? 34 : 26}
                        showTagline={isMdUp}
                    />
                </Box>

                {isMdUp && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        className={styles.nav}
                    >
                        {NAV_LINKS.map((item) => {
                            const isActive =
                                openMenu === item.menu;

                            return (
                                <Box
                                    key={item.menu}
                                    className={styles.navItem}
                                    onMouseEnter={() =>
                                        setOpenMenu(item.menu)
                                    }
                                >
                                    <Typography
                                        className={
                                            isActive
                                                ? `${styles.navLabel} ${styles.active}`
                                                : styles.navLabel
                                        }
                                    >
                                        {item.label}
                                    </Typography>

                                    <KeyboardArrowDownIcon
                                        className={
                                            isActive
                                                ? `${styles.navArrow} ${styles.arrowActive}`
                                                : styles.navArrow
                                        }
                                    />
                                </Box>
                            );
                        })}
                    </Stack>
                )}
            </Stack>

            {/* MEGA MENU */}

            {openMenu === "jobs" && <JobMegaMenu/>}

            {openMenu === "cv" && <CvMegaMenu/>}

            {openMenu === "tools" && <ToolMegaMenu/>}

            {openMenu === "career" && <CareerMegaMenu/>}

            {/* RIGHT */}

            {/* RIGHT */}

            {isMdUp ? (
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                >
                    {/* =====================
            CANDIDATE MODE
        ===================== */}

                    {mode === "candidate" && (
                        <>
                            <Button
                                variant="outlined"
                                className={styles.registerButton}
                                onClick={() =>
                                    navigate("/candidate/register")
                                }
                            >
                                Đăng ký
                            </Button>

                            <Button
                                variant="contained"
                                className={styles.loginButton}
                                onClick={() =>
                                    navigate("/candidate/login")
                                }
                            >
                                Đăng nhập
                            </Button>
                        </>
                    )}

                    {/* =====================
            EMPLOYER MODE
        ===================== */}

                    {mode === "employer" && (
                        <>
                            <Box className={styles.companyAccount}>
                                <Box className={styles.companyAvatar}>
                                    {companyName
                                        ? companyName.charAt(0).toUpperCase()
                                        : "C"}
                                </Box>

                                <Box className={styles.companyInfo}>
                                    <Typography className={styles.companyLabel}>
                                        Nhà tuyển dụng
                                    </Typography>

                                    <Typography
                                        className={styles.companyNameHeader}
                                        title={companyName || ""}
                                    >
                                        {companyName || "Doanh nghiệp"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                className={styles.logoutButton}
                                startIcon={<LogoutIcon/>}
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </Button>
                        </>
                    )}

                    {/* =====================
            EMPLOYER BUTTON
        ===================== */}

                    <Button
                        className={styles.employerButton}
                        startIcon={<ApartmentIcon/>}
                        onClick={handleEmployerAction}
                    >
                        Đăng tuyển & tìm hồ sơ
                    </Button>
                </Stack>
            ) : (
                <IconButton>
                    <MenuIcon/>
                </IconButton>
            )}

        </Box>
    );
}
