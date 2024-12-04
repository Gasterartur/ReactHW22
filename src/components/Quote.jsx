import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Правильный импорт
import { fetchRandomQuote } from '../features/quote/quoteSlice';

const Quote = () => {
  const dispatch = useDispatch();
  const { quote, author, status, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <blockquote>"{quote}"</blockquote>
      <p>- {author}</p>
      <button onClick={() => dispatch(fetchRandomQuote())}>Get New Quote</button>
    </div>
  );
};

export default Quote;

