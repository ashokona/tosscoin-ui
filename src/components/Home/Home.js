import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { get } from '../../services/api';
import { fetchCoinDetails, fetchLastGuess, updateGuess } from '../../store/actions/coin';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state?.auth.user);
  const coin = useSelector((state) => state?.coin.coin);
  const guess = useSelector((state) => state?.coin.guess);
  React.useEffect(async () => {
    console.log(guess)
    if (!coin) {
      dispatch(fetchCoinDetails())
      dispatch(fetchLastGuess())
      // setInterval(() => {
      //   dispatch(fetchCoinDetails())
      //   dispatch(fetchLastGuess())
      // }, 6000);
    }
  }, [])

  const onUserGuess = (status) => {
    dispatch(updateGuess({
      goup: status === 'up' ? true : false,
      status: 'INPROGRESS',
      rate: coin.rate
    }))
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
      {/* {user} */}
      <Typography variant="h5" component="div">
        {`Welcome ${guess?.name}, so far you have made ${guess?.success} Successfull guessess and ${guess?.failed} failed gusses.`}
      </Typography>
      {coin ? <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {coin.asset_id_base}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Current Value : ${coin.rate}
          </Typography>
          <Typography variant="body2">
            Please Guess The price would go up or down in next one minute
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" disabled={guess?.lastGuess?.status === 'INPROGRESS'} onClick={() => onUserGuess('up')} startIcon={<TrendingUpIcon />}>
              GO UP
            </Button>
            <Button variant="contained" disabled={guess?.lastGuess?.status === 'INPROGRESS'} onClick={() => onUserGuess('down')} endIcon={<TrendingDownIcon />}>
              GO DOWN
            </Button>
          </Stack>

        </CardActions>
      </Card> : ''}
    </Box>
  );
}
