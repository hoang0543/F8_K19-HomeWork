import {
  Box,
  Stack,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useNavigate } from "react-router-dom";

import styles from "./JobCard.module.css";

function formatSalary(salary) {
  if (!salary) {
    return "Thỏa thuận";
  }

  if (salary.is_negotiable) {
    return "Thỏa thuận";
  }

  if (salary.type === "RANGE") {
    const min = salary.min / 1_000_000;
    const max = salary.max / 1_000_000;

    return `${min} - ${max} triệu`;
  }

  return "Thỏa thuận";
}

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const salaryText = formatSalary(job.salary);

  const location =
    job.work_location?.[0]?.city_name ||
    "Chưa cập nhật";

  const handleOpenDetail = () => {
    navigate(`/jobs/${job.slug}`);
  };

  const handleSaveJob = (event) => {
    event.stopPropagation();

    console.log("Save job:", job.id);
  };

  return (
    <Box
      className={styles.card}
      onClick={handleOpenDetail}
    >
      <Box className={styles.logo}>
        {job.company?.logo_url ? (
          <img
            src={job.company.logo_url}
            alt={job.company.company_name}
          />
        ) : (
          <Typography>
            {job.company?.company_name
              ?.slice(0, 2)
              .toUpperCase()}
          </Typography>
        )}
      </Box>

      <Box className={styles.content}>
        <Typography className={styles.title}>
          {job.title}
        </Typography>

        <Typography className={styles.company}>
          {job.company?.company_name}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
        >
          <Chip
            label={salaryText}
            size="small"
            className={styles.salary}
          />

          <Chip
            label={location}
            size="small"
            className={styles.location}
          />

          {job.is_hot && (
            <Chip
              label="HOT"
              size="small"
              className={styles.hot}
            />
          )}
        </Stack>
      </Box>

      <IconButton
        size="small"
        className={styles.favorite}
        onClick={handleSaveJob}
      >
        <FavoriteBorderIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}