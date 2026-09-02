import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WorkOutlineTwoToneIcon from "@mui/icons-material/WorkOutlineTwoTone";

import Header from "../../../components/Header/Header.jsx";
import JobCard from "../../../components/jobCard/jobCard.jsx";

import { getJobs } from "../../../services/jobService.js";

import {
  CAREER_GROUPS,
  POSITIONS,
  CATEGORIES,
  PROVINCES,
} from "../../../data/CandidateJobListPage.js";

import styles from "./CandidateJobListPage.module.css";

/* =========================
   HERO SEARCH
========================= */

function HeroSearch() {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [locationOpen, setLocationOpen] = useState(false);

  const [locationSearch, setLocationSearch] = useState("");

  const [selectedLocation, setSelectedLocation] =
    useState("");

  const [keyword, setKeyword] = useState("");

  const categoryRef = useRef(null);
  const locationRef = useRef(null);

  const filteredProvinces = PROVINCES.filter((province) =>
    province
      .toLowerCase()
      .includes(locationSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setCategoryOpen(false);
      }

      if (
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setLocationOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSearch = () => {
    console.log({
      keyword,
      location: selectedLocation,
    });

    /*
      Sau này nếu BE hỗ trợ query:

      GET /jobs?keyword=...&city=...

      thì có thể đưa state này lên CandidateJobListPage
      rồi truyền vào getJobs(params).
    */
  };

  return (
    <Box className={styles.hero}>
      {/* TITLE */}

      <Typography className={styles.heroTitle}>
        Tìm việc làm nhanh 24H, việc làm mới nhất
        trên toàn quốc
      </Typography>

      <Typography className={styles.heroDescription}>
        Tiếp cận 60.000+ tin tuyển dụng việc làm mỗi
        ngày từ hàng nghìn doanh nghiệp uy tín tại
        Việt Nam
      </Typography>

      {/* SEARCH WRAPPER */}

      <Box
        ref={categoryRef}
        className={styles.searchWrapper}
      >
        <Stack
          className={
            categoryOpen
              ? `${styles.searchBar} ${styles.searchBarOpen}`
              : styles.searchBar
          }
        >
          {/* CATEGORY */}

          <Box
            className={styles.categoryButton}
            onClick={() =>
              setCategoryOpen(
                (previous) => !previous
              )
            }
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <WorkOutlineTwoToneIcon
                className={styles.categoryMainIcon}
              />

              <Typography
                className={styles.categoryButtonText}
              >
                Danh mục nghề nghiệp
              </Typography>
            </Stack>

            <KeyboardArrowDownIcon
              className={
                categoryOpen
                  ? `${styles.categoryArrow} ${styles.categoryArrowOpen}`
                  : styles.categoryArrow
              }
            />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            className={styles.searchDivider}
          />

          {/* KEYWORD */}

          <TextField
            placeholder="Vị trí tuyển dụng, tên công ty"
            fullWidth
            variant="standard"
            value={keyword}
            onChange={(event) =>
              setKeyword(event.target.value)
            }
            className={styles.searchInput}
            InputProps={{
              disableUnderline: true,

              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    className={styles.searchIcon}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Divider
            orientation="vertical"
            flexItem
            className={styles.searchDivider}
          />

          {/* LOCATION */}

          <Box
            ref={locationRef}
            className={styles.locationWrapper}
          >
            <TextField
              placeholder="Địa điểm"
              variant="standard"
              value={
                locationOpen
                  ? locationSearch
                  : selectedLocation
              }
              className={styles.locationInput}
              onFocus={() => {
                setLocationOpen(true);

                setLocationSearch(
                  selectedLocation
                );
              }}
              onChange={(event) => {
                setLocationSearch(
                  event.target.value
                );

                setLocationOpen(true);
              }}
              InputProps={{
                disableUnderline: true,

                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceOutlinedIcon
                      className={
                        styles.locationIcon
                      }
                    />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <KeyboardArrowDownIcon
                      className={
                        locationOpen
                          ? `${styles.locationArrow} ${styles.locationArrowOpen}`
                          : styles.locationArrow
                      }
                    />
                  </InputAdornment>
                ),
              }}
            />

            {locationOpen && (
              <Box
                className={
                  styles.locationDropdown
                }
              >
                <Typography
                  className={
                    styles.locationDropdownTitle
                  }
                >
                  Tỉnh / Thành phố
                </Typography>

                <Box
                  className={styles.locationList}
                >
                  {filteredProvinces.length >
                  0 ? (
                    filteredProvinces.map(
                      (province) => (
                        <Box
                          key={province}
                          className={
                            selectedLocation ===
                            province
                              ? `${styles.locationItem} ${styles.locationItemActive}`
                              : styles.locationItem
                          }
                          onClick={() => {
                            setSelectedLocation(
                              province
                            );

                            setLocationSearch(
                              province
                            );

                            setLocationOpen(
                              false
                            );
                          }}
                        >
                          <PlaceOutlinedIcon
                            className={
                              styles.locationItemIcon
                            }
                          />

                          <Typography
                            className={
                              styles.locationItemText
                            }
                          >
                            {province}
                          </Typography>
                        </Box>
                      )
                    )
                  ) : (
                    <Typography
                      className={
                        styles.noLocation
                      }
                    >
                      Không tìm thấy tỉnh /
                      thành phố
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Box>

          {/* SEARCH BUTTON */}

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            className={styles.searchButton}
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </Stack>

        {/* CATEGORY DROPDOWN */}

        {categoryOpen && (
          <Box className={styles.categoryDropdown}>
            <Box className={styles.categoryGrid}>
              {/* GROUP */}

              <Box>
                <Typography
                  className={styles.dropdownTitle}
                >
                  NHÓM NGHỀ
                </Typography>

                <Stack spacing={0.4}>
                  {CAREER_GROUPS.map(
                    (group) => (
                      <Typography
                        key={group.title}
                        className={
                          styles.dropdownItem
                        }
                      >
                        {group.title}
                      </Typography>
                    )
                  )}
                </Stack>
              </Box>

              {/* JOB */}

              <Box>
                <Typography
                  className={styles.dropdownTitle}
                >
                  NGHỀ
                </Typography>

                <Box
                  className={
                    styles.jobCategoryGrid
                  }
                >
                  {CAREER_GROUPS.flatMap(
                    (group) => group.jobs
                  )
                    .slice(0, 12)
                    .map((job) => (
                      <Typography
                        key={job}
                        className={
                          styles.dropdownItem
                        }
                      >
                        {job}
                      </Typography>
                    ))}
                </Box>
              </Box>

              {/* POSITION */}

              <Box>
                <Typography
                  className={styles.dropdownTitle}
                >
                  VỊ TRÍ CHUYÊN MÔN
                </Typography>

                <Stack spacing={0.3}>
                  {POSITIONS.map(
                    (position) => (
                      <Typography
                        key={position}
                        className={
                          styles.dropdownItem
                        }
                      >
                        {position}
                      </Typography>
                    )
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* =========================
   CATEGORY + BANNER
========================= */

function CategoriesAndBanner() {
  return (
    <Box className={styles.categoryBannerSection}>
      <Box className={styles.categoryBannerInner}>
        {/* CATEGORY */}

        <Box className={styles.categoryList}>
          <Typography
            className={styles.categoryHeading}
          >
            Danh mục nổi bật
          </Typography>

          <Stack spacing={0.5}>
            {CATEGORIES.map((category) => (
              <Stack
                key={category}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className={
                  styles.categoryListItem
                }
              >
                <Typography
                  className={
                    styles.categoryListText
                  }
                >
                  {category}
                </Typography>

                <ChevronRightIcon
                  className={
                    styles.categoryListArrow
                  }
                />
              </Stack>
            ))}
          </Stack>

          {/* PAGINATION */}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={
              styles.categoryPagination
            }
          >
            <Typography
              className={styles.pageNumber}
            >
              1/5
            </Typography>

            <Stack
              direction="row"
              spacing={1}
            >
              <IconButton
                size="small"
                className={
                  styles.paginationButton
                }
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                className={`${styles.paginationButton} ${styles.paginationButtonActive}`}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* BANNER */}

        <Box className={styles.banner}>
          <Box className={styles.bannerGlow} />

          <Stack
            className={styles.bannerContent}
          >
            <Typography
              className={styles.bannerBadge}
            >
              TOPCV RECOMMEND
            </Typography>

            <Typography
              className={styles.bannerTitle}
            >
              Cơ hội việc làm
              <Box
                component="span"
                className={
                  styles.bannerHighlight
                }
              >
                {" "}
                phù hợp hơn
              </Box>

              <br />

              dành cho bạn
            </Typography>

            <Typography
              className={
                styles.bannerDescription
              }
            >
              Khám phá hàng nghìn cơ hội việc
              làm mới mỗi ngày và tìm công việc
              phù hợp với kinh nghiệm, kỹ năng
              và mục tiêu của bạn.
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              className={
                styles.bannerActions
              }
            >
              <Button
                variant="contained"
                className={
                  styles.bannerButton
                }
              >
                Khám phá ngay
              </Button>

              <Typography
                className={
                  styles.bannerSubText
                }
              >
                60.000+ việc làm mới
              </Typography>
            </Stack>
          </Stack>

          <Box
            className={
              styles.bannerDecoration
            }
          >
            <Box
              className={
                styles.decorationCircleLarge
              }
            />

            <Box
              className={
                styles.decorationCircleSmall
              }
            />

            <Typography
              className={styles.bannerStat}
            >
              <Box
                component="span"
                className={
                  styles.bannerStatNumber
                }
              >
                24H
              </Box>

              <Box
                component="span"
                className={
                  styles.bannerStatText
                }
              >
                cập nhật việc làm mới
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* =========================
   JOB LIST
========================= */

function JobListSection() {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [tab, setTab] =
    useState("office");

  const [
    locationFilter,
    setLocationFilter,
  ] = useState("Ngẫu Nhiên");

  const locations = [
    "Ngẫu Nhiên",
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Miền Bắc",
    "Miền Nam",
  ];

  /* =========================
     FETCH JOBS
  ========================= */

  const fetchJobs = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getJobs();

      console.log("GET JOBS RESPONSE:", data);

      /*
        Hỗ trợ một số response phổ biến:

        [
          {...},
          {...}
        ]

        hoặc:

        {
          items: [...]
        }

        hoặc:

        {
          data: [...]
        }

        Sau khi biết chính xác response GET /jobs
        của BE thì có thể rút gọn phần này.
      */

      if (Array.isArray(data)) {
        setJobs(data);

        return;
      }

      if (Array.isArray(data?.items)) {
        setJobs(data.items);

        return;
      }

      if (Array.isArray(data?.data)) {
        setJobs(data.data);

        return;
      }

      if (Array.isArray(data?.results)) {
        setJobs(data.results);

        return;
      }

      console.warn(
        "Không nhận được array jobs:",
        data
      );

      setJobs([]);
    } catch (error) {
      console.error(
        "GET JOBS ERROR:",
        error
      );

      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Không thể tải danh sách việc làm";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* =========================
     LOCATION FILTER
  ========================= */

  const displayedJobs = useMemo(() => {
    if (
      locationFilter === "Ngẫu Nhiên" ||
      locationFilter === "Miền Bắc" ||
      locationFilter === "Miền Nam"
    ) {
      return jobs;
    }

    return jobs.filter((job) =>
      job.work_location?.some(
        (location) =>
          location.city_name ===
          locationFilter
      )
    );
  }, [jobs, locationFilter]);

  return (
    <Box className={styles.jobSection}>
      {/* TITLE */}

      <Stack
        className={styles.jobSectionHeader}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            className={styles.sectionTitle}
          >
            Việc làm tốt nhất
          </Typography>

          <Stack
            direction="row"
            spacing={1}
          >
            <Chip
              label="Việc văn phòng"
              onClick={() =>
                setTab("office")
              }
              className={
                tab === "office"
                  ? `${styles.tabChip} ${styles.tabChipActive}`
                  : styles.tabChip
              }
            />

            <Chip
              label="Việc phổ thông"
              onClick={() =>
                setTab("labor")
              }
              className={
                tab === "labor"
                  ? `${styles.tabChip} ${styles.tabChipActive}`
                  : styles.tabChip
              }
            />
          </Stack>
        </Stack>

        {/* VIEW ALL */}

        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
        >
          <Typography
            className={styles.viewAll}
          >
            Xem tất cả
          </Typography>

          <IconButton size="small">
            <ChevronLeftIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            className={styles.nextButton}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* FILTER */}

      <Stack
        className={styles.filterSection}
      >
        <Chip
          icon={<TuneIcon />}
          label="Lọc theo: Địa điểm"
          variant="outlined"
          className={styles.filterTitle}
        />

        <Stack
          direction="row"
          spacing={1}
          className={
            styles.locationFilters
          }
        >
          {locations.map((location) => (
            <Chip
              key={location}
              label={location}
              onClick={() =>
                setLocationFilter(location)
              }
              className={
                locationFilter === location
                  ? `${styles.locationFilter} ${styles.locationFilterActive}`
                  : styles.locationFilter
              }
            />
          ))}
        </Stack>
      </Stack>

      {/* INFO */}

      <Box className={styles.infoBox}>
        💡 Gợi ý: Nhấn vào một việc làm để xem
        thông tin chi tiết
      </Box>

      {/* LOADING */}

      {loading && (
        <Box
          sx={{
            py: 8,

            display: "flex",

            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* ERROR */}

      {!loading && error && (
        <Stack spacing={2}>
          <Alert severity="error">
            {error}
          </Alert>

          <Button
            variant="outlined"
            onClick={fetchJobs}
            sx={{
              alignSelf: "flex-start",
            }}
          >
            Thử lại
          </Button>
        </Stack>
      )}

      {/* EMPTY */}

      {!loading &&
        !error &&
        displayedJobs.length === 0 && (
          <Alert severity="info">
            Hiện chưa có việc làm phù hợp.
          </Alert>
        )}

      {/* JOB GRID */}

      {!loading &&
        !error &&
        displayedJobs.length > 0 && (
          <Box className={styles.jobGrid}>
            {displayedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </Box>
        )}
    </Box>
  );
}

/* =========================
   PAGE
========================= */

export default function CandidateJobListPage() {
  return (
    <Box className={styles.page}>
      <Header />

      <Box className={styles.heroArea}>
        <HeroSearch />

        <CategoriesAndBanner />
      </Box>

      <JobListSection />
    </Box>
  );
}