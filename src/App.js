import { makeStyles } from "@mui/styles"
import axios from "axios"
import { useEffect, useState } from "react";
import ToText from "./utils/toText";

import BG from '../src/assets/background.jpg'
import lilcuh from '../src/assets/lilcuh.png'
import discordIcon from '../src/assets/discordIcon.png'
import mediumIcon from '../src/assets/mediumIcon.png'
import temp from '../src/assets/temp.png'

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { NFTs } from "./components/NFTs";


let mediumURL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kunalchaubal";

function App() {
  const classes = useStyles()

  const [feed, setFeed] = useState()
  const [profile, setProfile] = useState()
  const [nfts, setNFTs] = useState({})

  const { Moralis } = useMoralis()
  const Web3Api = useMoralisWeb3Api()

  const fetchNFTs = async () => {
    const options = { chain: 'eth', address: process.env.REACT_APP_WALLET };
    const results = await Web3Api.account.getNFTs(options)

    return results
  }

  const serverUrl = process.env.REACT_APP_MORALIS_SERVER;
  const appId = process.env.REACT_APP_MORALIS_APP_ID;

  useEffect(() => {
    Moralis.start({ serverUrl, appId })
    fetchNFTs().then((res) => setNFTs(res))

    // MEDIUM CALL

    // axios.get(mediumURL).then((res) => {
    //   setFeed(res.data.items)
    //   setProfile(res.data.feed)
    // })

  }, []);
  return (
    <div className={classes.appContainer}>
      <div className={classes.headerContainer} style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover' }}>
        <div className={classes.heroContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className={classes.iconContainer} >
            <img src={lilcuh} style={{ width: '90%', marginLeft: 70, cursor: 'pointer' }} onClick={() => window.open('https://opensea.io/collection/deadfellaz')} />
          </div>
          <div className={classes.headerInfoContainer}>
            <h2 className={classes.headerTitle}>NO QUEMA CUH!!</h2>
            <p className={classes.headerSubtext}>
              Join the LatinX inspired crypto community behind Dead Fellaz #1451. Follow our Twitter for the latest
              in crypto news or join our discord and come speak with our community. Zero miedo mi compa.
              Everyone welcomed, cause everyone's a cuh.
            </p>
            <div className={classes.socialContainer}>
              <div className={classes.socialIcon}>
                <InstagramIcon style={{ fontSize: 30, color: 'lightgreen' }} />
              </div>
              <div className={classes.socialIcon}>
                <TwitterIcon style={{ fontSize: 30, color: 'lightgreen' }} />
              </div>
              <div className={classes.socialIcon}>
                <img src={discordIcon} style={{ width: '40%', }} />
              </div>
              <div className={classes.socialIcon}>
                <img src={mediumIcon} style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NFTs nfts={nfts.result} />

      {/* BLOG CONTAINER */ }

      {/* <div className={classes.blogContainer}>
        {console.log(profile)}
        <div className={classes.profileThumbnail} style={{backgroundImage: `url(https://media.discordapp.net/attachments/717579666264817745/939612403614761000/IMG_4817.png)`, backgroundSize: 'cover'}}>
 
        </div>
        <p style={{ fontSize: 25, fontWeight: '700', color: '#02072b' }}>Stories by El Mero Mero</p>
        <p style={{fontSize: 16, color: 'silver', marginTop: 8, }}>lil cuh</p>
        <div className={classes.mediumButton}>
          Read on Medium
        </div>
        <div className={classes.scrollContainer}>
          {feed && feed.map((item, index) => {
            return (
              <>
                <div className={classes.blogItem} key={index} onClick={() => window.open(`${item.link}`, '_blank')} >
                  <div className={classes.imageContainer} style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                  <h2 className={classes.blogTitle}>{item.title}</h2>
                  <p className={classes.blogDescription}>{`${ToText(item.description).substring(0, 150)}...`}</p>
                  <div className={classes.blogInfo}>
                    <p className={classes.blogDescription}>Author: {item.author}</p>
                    <p className={classes.blogDescription}>Date: {item.pubDate}</p>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div> */}
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  headerContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  headerTitle: {
    fontSize: 70,
    fontWeight: '800',
    color: 'lightgreen',
  },
  headerSubtext: {
    fontSize: 20,
    width: '100%',
    opacity: .6,
    textAlign: 'center',
    color: 'lightgreen'
  },
  socialContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
  },
  nftContainer: {
    textAlign: 'center',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
    display: 'flex',
    justifyContent: 'flex-start',
    width: '25%',
    bottom: '30%',
    right: 100,
  },
  collection: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  nft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: '30%',
    background: '#350f76',
    borderRadius: 8,
  },
  socialIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    height: 55,
    width: 55,
    background: '#6a0e89',
    border: '3px solid #6a0e89',
    borderRadius: 100,

  },
  imageContainer: {
    height: 225,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  profileThumbnail: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    height: 120,
    width: 120,
    borderRadius: 100,
    marginBottom: 25
  },
  mediumButton: {
    marginTop: 25,
    marginBottom: 30,
    padding: '9px 30px',
    height: 20,
    borderRadius: 8,
    border: '1px solid #02072b',
    background: 'white',
    color: '#02072b',
    transition: 'all ease-in-out .3s',
    cursor: 'pointer',
    '&:hover': {
      color: 'white',
      background: "#02072b",

    }
  },
  heroContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '60%',
    width: '40%',
  },
  headerInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '40%',
    width: '40%',
  },
  blogContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    flexFlow: 'row wrap',
    background: 'white'

  },
  blogItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    maxHeight: 500,
    minHeight: 500,
    marginBottom: 50,
    width: '31%',
    borderRadius: 8,
    background: '#02072b',
    boxShadow: '0 0px 18px hsl(0deg 0% 0% / 0.3);',
    cursor: 'pointer',
  },
  scrollContainer: {
    display: 'flex',
    padding: '0px 20px',
    justifyContent: 'space-between',
    overflowY: 'scroll',
    flexWrap: 'wrap',
    maxHeight: 550,
    width: '80%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  blogTitle: {
    fontSize: 20,
    color: 'white',
    marginLeft: 25,
    marginTop: 20,
    width: '85%',
  },
  blogDescription: {
    fontSize: 16,
    color: 'silver',
    marginLeft: 25,
    marginTop: 8,
    width: '75%',
  },
  blogInfo: {
    flex: 1,
    width: '100%',
    display: 'flex',
    paddingBottom: 30,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})
