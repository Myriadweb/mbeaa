import React, { useContext, useEffect } from 'react';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import {Modal, Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import '../App.css';
import {CSSTransition} from "react-transition-group";
import aaContent from '../assets/aa.json';

function Home() {
  const [chapterId, setChapterId] = React.useState(1);

  const updateChapterId = (id: number) => {
    id > 0 && id < 7 && setChapterId(id);
  }
  // @ts-ignore
  let location = useLocation();
  return (
    <div className="Container">
      <div className="ChapterGuide">
        <img className="TrainRoute" src={require(`../assets/images/train/MBE_AA_train-route.png`)} alt="Train Route" />
        <div className="ChapterList">
          <div className="ChapterItem">
            <span className="ChapterLine"></span>
            <Button variant="outline-secondary" active={chapterId === 1} onClick={() => updateChapterId(1)}>Packing Up</Button>
          </div>
          <div className="ChapterItem">
            <span className="ChapterLine" style={{width: 140 }}></span>
            <Button variant="outline-secondary" active={chapterId === 2} onClick={() => updateChapterId(2)}>The 'Eddy Special'</Button>
          </div>
          <div className="ChapterItem">
            <span className="ChapterLine" style={{width: 158 }}></span>
            <Button variant="outline-secondary" active={chapterId === 3} onClick={() => updateChapterId(3)}>Preventing a Scoop</Button>
          </div>
          <div className="ChapterItem">
            <span className="ChapterLine" style={{width: 106 }}></span>
            <Button variant="outline-secondary" active={chapterId === 4} onClick={() => updateChapterId(4)}>Sparks Fly</Button>
          </div>
          <div className="ChapterItem">
            <span className="ChapterLine" style={{width: 157 }}></span>
            <Button variant="outline-secondary" active={chapterId === 5} onClick={() => updateChapterId(5)}>Eventful Arrival</Button>
          </div>
          <div className="ChapterItem">
            <span className="ChapterLine" style={{width: 134 }}></span>
            <Button variant="outline-secondary" active={chapterId === 6} onClick={() => updateChapterId(6)}>Ablaze with Light</Button>
          </div>
        </div>
      </div>
      <div className="ChapterContent">
        <div className="HomeHeader">
          <div className="Title">All Aboard!</div>
          <div className="Intro">Scroll or use the chapter guide to explore Mary Baker Eddy's move from Concord, New Hampshire to Chestnut Hill, Massachusetts. Touch an image to expand and learn more.</div>
        </div>
        <div className="HomeContent">
          <ChapterContent id={chapterId} />
        </div>
      </div>
      <div className="ChapterNavigation">

        <Link to="#" onClick={() => updateChapterId(chapterId - 1)} className="PrevLink" style={chapterId === 1 ? {opacity: .5} : {opacity: 1}}>
          <img src={require(`../assets/images/MBE_AA_arrow.png`)} alt="Prev" />
        </Link>
        <Link to="#" onClick={() => updateChapterId(chapterId + 1)} className="NextLink" style={chapterId === 6 ? {opacity: .5} : {opacity: 1}}>
          <img src={require(`../assets/images/MBE_AA_arrow.png`)} alt="Next" />
        </Link>
      </div>
    </div>
  );
}

function ChapterContent({id}: { id: any }) {
  const [showImg1, setShowImg1] = React.useState(false);
  const [showImg2, setShowImg2] = React.useState(false);
  const [showKidsFacts, setShowKidsFacts] = React.useState(false);
  useEffect(() => {
    setShowKidsFacts(false)
  }, [id]);
  return (
    <div className="Card">
      {aaContent.filter((item) => item.ID === id).map((item) => (
        <div key={item.ID} className="CardContainer">
          <div className="CardContent">
            <div className="CardTitle">
              {item.TITLE}
            </div>
            <div className="CardBody">
              <div className="CardText" dangerouslySetInnerHTML={{__html: item.MAIN_TEXT}}></div>
              <div className="CardPortrait">
                <div className="Portrait">
                  <img src={require(`../assets/images/portraits/${item.PORTRAIT}`)} alt={item.ATTRIBUTION} />
                </div>
                <div className="Quote">
                  <div className="QuoteContent">{item.QUOTE}</div>
                  <div className="QuoteAuthor">&ndash; {item.ATTRIBUTION}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Popups">
            <img src={require(`../assets/images/popups/${item.IMAGE_1}`)} alt={item.CAPTION_1} onClick={() => setShowImg1(true)} style={{marginBottom: 30}} />
            <img src={require(`../assets/images/popups/${item.IMAGE_2}`)} alt={item.CAPTION_2} onClick={() => setShowImg2(true)} />
          </div>
          <Modal show={showImg1} onHide={() => setShowImg1(false)} size="xl">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <img src={require(`../assets/images/popups/${item.IMAGE_1}`)} alt={item.CAPTION_1} />
              <div className="Caption" dangerouslySetInnerHTML={{__html: item.CAPTION_1}}></div>
              <div className="Copyright">@ Private collection.</div>
            </Modal.Body>
          </Modal>
          <Modal show={showImg2} onHide={() => setShowImg2(false)} size="xl">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <img src={require(`../assets/images/popups/${item.IMAGE_2}`)} alt={item.CAPTION_2} />
              <div className="Caption" dangerouslySetInnerHTML={{__html: item.CAPTION_2}}></div>
              <div className="Copyright">@ Private collection.</div>
            </Modal.Body>
          </Modal>
          {item.KIDS_FACTS && (
          <>
            <div className="acorn active" onClick={() => setShowKidsFacts(true)}>
              <img src={require('../assets/images/MBE_acorn.png')} alt="acorn" />
            </div>
            <div className={showKidsFacts ? "acorn-popup active" : "acorn-popup"} onClick={() => setShowKidsFacts(false)}>
              <div className="close"></div>
              {item.KIDS_FACTS}
            </div>
          </>
          )}
          {!item.KIDS_FACTS && (
            <div className="acorn">
              <img src={require('../assets/images/MBE_acorn.png')} alt="acorn" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;