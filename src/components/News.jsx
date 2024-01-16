import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './News.scss';
import Loader from './Loader';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  // FETCH NEWS

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/news');
      const data = await res.data;
      setNews(data);
    } catch (error) {
      setError("404 Not Found");
    } finally {
      setLoading(false);
    }
  };


  // GET USER POST DETAILS...

  const getUserPostDetails = async (id) => {
    try {
      const res = axios.get(
        `http://localhost:3000/news${id}`
      );
      const data = await res.data;
      setNews(data);
    } catch (error) {
      setError("404 Not Found");
    } finally {
      setLoading(false);
    }
  };


  // USE_EFFECT 


  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className='body'>
      {/* LOADING */}

      {loading ? <Loader loading={loading} /> : null}

      {/* ERROR */}

      {error ? <h3 className="Error">{error}</h3> : null}

      {/* HEADER */}

      <h1 className='title'>"Osmondagi Bolalar" News</h1>


      {/* NEWS */}

      {news.length > 0 ? (
        <div className="News">
          {news.map((ne) => (
            <div className="new" onClick={() => getUserPostDetails(ne.id)}>
            {ne.image ? <img className='image_new' src={ne.image} /> : null}
            <h3><span>"Osmondagi bolalar"</span> ko'rsatuvining <span>{ne.id}</span>-soni mehmoni :</h3>
            <h3 className='names'>{ne.name} {ne.username}</h3>
            <div className="btns">
            <button className='btn_1'><a href={ne.youtube_chanel}>YouTube</a></button>
            <button className='btn_1'><a href={ne.instagram_chanel}>Instagram</a></button>
            <button className='btn_1'><a href={ne.telegram_chanel}>Telegram</a></button>
            </div>
          </div>
          ))} 
        </div>
      ) : null}


      {/* PAGINATION */}

    

      {/* POST DETAILS */}

      <h1 className='title'>POST DETAILS...</h1>
      
      <div className="post_details">
      {news.map((ne) => (
          <div key={ne.id} className="post_detail">
            <h1>{ne.name}</h1>
          </div>
    ))}
      </div>
      
    </div>
  )
}

export default News