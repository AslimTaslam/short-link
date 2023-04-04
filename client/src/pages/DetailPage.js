import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useService } from '../services/apiHook';
import { DetailCard } from '../components/DetailCard';
import { Loader } from '../components/Loader';

const DetailPage = () => {
  const navigate = useNavigate();
  const { getLink, deleteLink } = useService();
  const { id } = useParams();
  const [link, setLink] = useState({});
  const [ready, setReady] = useState(false);

  const loadData = async () => {
    console.log('load');
    const res = await getLink(id);
    console.log(res);
    setLink(res.data);
    setReady(true);
  };

  const deleteData = async () => {
    await deleteLink(id);
    navigate('/links');
  };

  const incClicks = () => {
    let inc = link.clicks++;
    setLink({ ...link, clicks: inc });
  };

  const backPage = () => {
    navigate('/links');
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!ready) {
    return <Loader />;
  }
  return (
    <DetailCard
      link={link}
      deleteData={deleteData}
      backPage={backPage}
      incClicks={incClicks}
    />
  );
};

export default DetailPage;
