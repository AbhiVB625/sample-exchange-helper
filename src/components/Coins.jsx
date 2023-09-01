import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../index';
import {
  Button,
  Container,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  const [filteredCoins, setFilteredCoins] = useState([]);
  const currencySymbol =
    currency === 'inr'
      ? '₹'
      : currency === 'eur'
      ? '€'
      : currency === 'gbp'
      ? '£'
      : currency === 'hkd'
      ? 'HK$'
      : '$';
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setFilteredCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  const handleSearch = (searchText) => {
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCoins(filtered);
    setPage(1);
  };

  if (error) return <ErrorComponent message={'Error While Fetching Coins'} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'} justifyContent={'center'}>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={'Search for a Coin'}
              w={500}
              mt={4}
            />
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'} justifyContent={['center', 'left']}>
              <Radio value="inr">INR</Radio>
              <Radio value="hkd">HKD</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="gbp">GBP</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {filteredCoins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                url={i.url}
                key={i.id}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack
            w={'full'}
            justifyContent={['left', 'center']}
            overflow={'scroll'}
            p={'9'}
          >
            {Array.from({ length: totalPages }, (item, index) => (
              <Button
                key={index}
                bgColor={'blackAlpha.900'}
                color={'white'}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
