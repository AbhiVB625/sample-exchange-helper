// #28003B dark purplish

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../index';
import { Container, HStack, Button, Input } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import ExchangeCard from './ExchangeCard';

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredExchanges.length / itemsPerPage);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?page=${page}`);
        setExchanges(data);
        setFilteredExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [page]);

  const handleSearch = (searchText) => {
    const filtered = exchanges.filter((exchange) =>
      exchange.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredExchanges(filtered);
    setPage(1);
  };

  if (error)
    return <ErrorComponent message={'Error While Fetching Exchanges'} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'} justifyContent={'center'}>
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={'Search for an Exchange'}
              w={500}
              mt={4}
            />
          </HStack>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {filteredExchanges.map((i) => (
              <ExchangeCard
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
                key={i.id}
              />
            ))}
          </HStack>
          <HStack
            w={'full'}
            overflowX={'auto'}
            justifyContent={['left', 'center']}
            p={'8'}
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

export default Exchanges;
