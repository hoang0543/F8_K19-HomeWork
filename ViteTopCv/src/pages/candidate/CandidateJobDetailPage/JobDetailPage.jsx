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
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

import Header from "../../../components/Header/Header.jsx";

import {
  getJobBySlug,
} from "../../../services/jobService.js";

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
   SEARCH BAR
========================================================= */

function JobSearchBar() {
  const [keyword, setKeyword] =
    useState("");

  const [location, setLocation] =
    useState("");

  const handleSearch = () => {
    console.log({
      keyword,
      location,
    });

    /*
      Sau này nếu BE có API search:

      GET /jobs?keyword=...&location=...

      thì gọi API tại đây.
    */
  };

  return (
    <Box
      className={
        styles.searchSection
      }
    >
      <Box
        className={
          styles.searchContainer
        }
      >
        {/* CATEGORY */}

        <Box
          className={
            styles.categorySearch
          }
        >
          <Typography>
            ☷
          </Typography>

          <Typography
            className={
              styles.categorySearchText
            }
          >
            Danh mục Nghề
          </Typography>

          <KeyboardArrowDownIcon />
        </Box>

        {/* KEYWORD */}

        <TextField
          fullWidth
          placeholder="Vị trí tuyển dụng"
          variant="standard"
          value={keyword}
          onChange={(event) =>
            setKeyword(
              event.target.value
            )
          }
          className={
            styles.searchInput
          }
          InputProps={{
            disableUnderline: true,

            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* LOCATION */}

        <TextField
          placeholder="Địa điểm"
          variant="standard"
          value={location}
          onChange={(event) =>
            setLocation(
              event.target.value
            )
          }
          className={
            styles.locationInput
          }
          InputProps={{
            disableUnderline: true,

            startAdornment: (
              <InputAdornment position="start">
                <PlaceOutlinedIcon />
              </InputAdornment>
            ),

            endAdornment: (
              <InputAdornment position="end">
                <KeyboardArrowDownIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* SEARCH */}

        <Button
          variant="contained"
          className={
            styles.searchButton
          }
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </Box>
    </Box>
  );
}

/* =========================================================
   BREADCRUMB
========================================================= */

function Breadcrumb({ job }) {
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

      <ChevronRightIcon />

      <Typography>
        Việc làm
      </Typography>

      <ChevronRightIcon />

      <Typography>
        {job.category ||
          "Danh mục"}
      </Typography>

      <ChevronRightIcon />

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
        <Icon />
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

function JobHeaderCard({ job }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [saved, setSaved] = useState(false);

  const jobLocation =
    job.work_location?.[0]?.city_name ||
    "Chưa cập nhật";

  const handleApply = () => {
    navigate("/candidate/login", {
      state: {
        from: location.pathname,
      },
    });
  };

  return (
    <Box className={styles.jobHeaderCard}>
      <Typography className={styles.jobTitle}>
        {job.title}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        className={styles.salaryRow}
      >
        <Typography className={styles.salary}>
          {formatSalary(job.salary)}
        </Typography>

        {job.is_hot && (
          <Chip
            label="HOT"
            size="small"
            className={styles.hotChip}
          />
        )}
      </Stack>

      <Box className={styles.jobInfoGrid}>
        <JobInfoItem
          icon={LocationOnOutlinedIcon}
          label="Địa điểm"
          value={jobLocation}
        />

        <JobInfoItem
          icon={WorkHistoryOutlinedIcon}
          label="Kinh nghiệm"
          value={
            job.experience_level ||
            "Không yêu cầu"
          }
        />

        <JobInfoItem
          icon={AccessTimeOutlinedIcon}
          label="Hạn ứng tuyển"
          value={formatDeadline(job.deadline)}
        />
      </Box>

      <Stack className={styles.actionRow}>
        <Button
          variant="contained"
          startIcon={<SendOutlinedIcon />}
          className={styles.applyButton}
          onClick={handleApply}
        >
          Ứng tuyển ngay
        </Button>

        <Button
          variant="outlined"
          startIcon={
            <FavoriteBorderOutlinedIcon />
          }
          className={
            saved
              ? `${styles.saveButton} ${styles.saveButtonActive}`
              : styles.saveButton
          }
          onClick={() =>
            setSaved((previous) => !previous)
          }
        >
          {saved ? "Đã lưu" : "Lưu tin"}
        </Button>
      </Stack>
    </Box>
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
            <BusinessOutlinedIcon />
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
          <PeopleAltOutlinedIcon />

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
          <BusinessOutlinedIcon />

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
          <ApartmentOutlinedIcon />

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
          <OpenInNewOutlinedIcon />
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

function Overview({ job }) {
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
      <Header />

      <Box
        sx={{
          minHeight: "60vh",

          display: "flex",

          alignItems: "center",

          justifyContent:
            "center",
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
        >
          <CircularProgress />

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
  const { slug } =
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
    return <LoadingPage />;
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <Box
        className={styles.page}
      >
        <Header />

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
        <Header />

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
      <Header />

      <JobSearchBar />

      <Box
        className={styles.main}
      >
        <Breadcrumb job={job} />

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

            <Overview job={job} />
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