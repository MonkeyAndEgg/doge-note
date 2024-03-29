import { Toolbar, alpha, Typography, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
  onFilter: () => void;
}

export default function EnhancedTableToolbar({ numSelected, onDelete, onFilter }: EnhancedTableToolbarProps) {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Transactions
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={onFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}